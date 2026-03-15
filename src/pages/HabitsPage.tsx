import type { HabitItem } from "../types";
import "./HabitsPage.css";

interface HabitsPageProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
}

const HabitsPage = ({ habits, onToggleHabit }: HabitsPageProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="habits-page-view">
      <div className="habits-header">
        <h1 className="page-title">Habit Tracker</h1>
        <div className="habits-stats">
          <div className="stat-box-refined">
            <span className="box-val">{habits.length}</span>
            <span className="box-lab">Active Habits</span>
          </div>
          <div className="stat-box-refined indigo">
            <span className="box-val">{habits.reduce((acc, h) => acc + h.streak, 0)}</span>
            <span className="box-lab">Total Streak Score</span>
          </div>
        </div>
      </div>

      <div className="matrix-container">
        <div className="matrix-header-row">
          <div className="habit-name-cell">Habit Name</div>
          {days.map(d => <div key={d} className="day-cell">{d}</div>)}
          <div className="streak-cell">Streak</div>
        </div>

        {habits.map(habit => (
          <div key={habit.id} className="matrix-row">
            <div className="habit-name-cell">
              <span className="h-name-refined">{habit.name}</span>
              <button 
                className={`check-btn-refined ${habit.completedToday ? "checked" : ""}`}
                onClick={() => onToggleHabit(habit.id)}
              >
                {habit.completedToday ? "Done" : "Check"}
              </button>
            </div>
            
            {habit.lastSevenDays.map((done, i) => (
              <div key={i} className={`day-cell ${done ? "filled" : ""} ${i === 6 ? "is-today" : ""}`}>
                <div className="cell-sq-refined" />
              </div>
            ))}

            <div className="streak-cell">
              <span className="streak-num-refined">{habit.streak}</span>
              <span className="streak-unit">Days</span>
            </div>
          </div>
        ))}

        <div className="matrix-footer">
          <button className="habit-btn-primary">+ Add New Habit</button>
        </div>
      </div>

      <div className="habit-insights">
        <div className="insight-card-refined">
          <h3>Weekly Summary</h3>
          <p>You are performing 15% better than last week.</p>
        </div>
        <div className="insight-card-refined">
          <h3>Next Milestone</h3>
          <p>Morning Workout: 3 days to hit 15-day streak award.</p>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
