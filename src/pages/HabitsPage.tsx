import type { HabitItem } from "../types";
import "./HabitsPage.css";

interface HabitsPageProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
}

const HabitsPage = ({ habits, onToggleHabit }: HabitsPageProps) => {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="brutal-page habits-page">
      <div className="habits-header">
        <h1>HABIT_MATRIX</h1>
        <div className="habits-stats">
          <div className="stat-box-refined">
            <span className="box-val">{habits.length}</span>
            <span className="box-lab">ACTIVE_HABITS</span>
          </div>
          <div className="stat-box-refined indigo">
            <span className="box-val">{habits.reduce((acc, h) => acc + h.streak, 0)}</span>
            <span className="box-lab">TOTAL_STREAK_SCORE</span>
          </div>
        </div>
      </div>

      <div className="matrix-container">
        <div className="matrix-header-row">
          <div className="habit-name-cell">HABIT_NAME</div>
          {days.map(d => <div key={d} className="day-cell">{d}</div>)}
          <div className="streak-cell">STREAK</div>
        </div>

        {habits.map(habit => (
          <div key={habit.id} className="matrix-row">
            <div className="habit-name-cell">
              <span className="h-name-refined">{habit.name}</span>
              <button 
                className={`check-btn-refined ${habit.completedToday ? "checked" : ""}`}
                onClick={() => onToggleHabit(habit.id)}
              >
                {habit.completedToday ? "DONE" : "CHECK"}
              </button>
            </div>
            
            {habit.lastSevenDays.map((done, i) => (
              <div key={i} className={`day-cell ${done ? "filled" : ""} ${i === 6 ? "is-today" : ""}`}>
                <div className="cell-sq-refined" />
              </div>
            ))}

            <div className="streak-cell">
              <span className="streak-num-refined">{habit.streak}</span>
              <span className="streak-unit">DAYS</span>
            </div>
          </div>
        ))}

        <div className="matrix-footer">
          <button className="habit-btn-primary">+ ADD_NEW_HABIT</button>
        </div>
      </div>

      <div className="habit-insights">
        <div className="insight-card-refined">
          <h3>WEEKLY_SUMMARY</h3>
          <p>You are performing 15% better than last week.</p>
        </div>
        <div className="insight-card-refined">
          <h3>NEXT_MILESTONE</h3>
          <p>Morning Workout: 3 days to hit 15-day streak award.</p>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
