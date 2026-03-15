import type { HabitItem } from "../../types";

interface HabitCheckinProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
}

const HabitCheckin = ({ habits, onToggleHabit }: HabitCheckinProps) => {
  return (
    <div className="dash-panel habit-checkin-panel">
      <div className="panel-header">
        <h3 className="panel-title">Habit Check-in</h3>
        <span className="panel-count">
          {habits.filter((h) => h.completedToday).length}/{habits.length} Done
        </span>
      </div>

      <div className="habit-checkin-row">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card-fine">
            <div className="habit-left">
              <span className="habit-name-fine">{habit.name}</span>
              <span className="habit-streak-badge">{habit.streak} DAY STREAK</span>
              <div className="habit-dots-track">
                {habit.lastSevenDays.map((done, i) => (
                  <div
                    key={i}
                    className={`habit-dot ${done ? "active" : ""} ${i === 6 ? "today" : ""}`}
                    title={i === 6 ? "Today" : `${6 - i} days ago`}
                  />
                ))}
              </div>
            </div>
            <button
              className={`check-trigger ${habit.completedToday ? "done" : ""}`}
              onClick={() => onToggleHabit(habit.id)}
            >
              {habit.completedToday ? "✓" : "+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitCheckin;
