import type { HabitItem } from "../../types";

interface HabitCheckinProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
}

const HabitCheckin = ({ habits, onToggleHabit }: HabitCheckinProps) => {
  return (
    <div className="panel habit-checkin">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="panel-index">04</span>
          <h3 className="panel-title">HABIT CHECK-IN</h3>
        </div>
        <span className="panel-count">
          {habits.filter((h) => h.completedToday).length}/{habits.length}
        </span>
      </div>

      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className={`habit-item ${habit.completedToday ? "checked" : ""}`}>
            <div className="habit-main">
              <button
                className={`habit-toggle ${habit.completedToday ? "active" : ""}`}
                onClick={() => onToggleHabit(habit.id)}
              >
                {habit.completedToday ? "✓" : ""}
              </button>
              <div className="habit-info">
                <span className="habit-name">{habit.name}</span>
                <span className="habit-streak-text">{habit.streak} day streak</span>
              </div>
            </div>
            <div className="streak-dots">
              {habit.lastSevenDays.map((done, i) => (
                <div
                  key={i}
                  className={`streak-dot ${done ? "filled" : ""} ${i === 6 ? "today" : ""}`}
                  title={i === 6 ? "Today" : `${6 - i} days ago`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitCheckin;
