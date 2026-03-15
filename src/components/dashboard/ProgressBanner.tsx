import type { TaskItem, HabitItem } from "../../types";

interface ProgressBannerProps {
  userName: string;
  tasks: TaskItem[];
  habits: HabitItem[];
  studyMinutesToday: number;
}

const ProgressBanner = ({ userName, tasks, habits, studyMinutesToday }: ProgressBannerProps) => {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completedHabits = habits.filter((h) => h.completedToday).length;
  const totalHabits = habits.length;

  // Overall progress: tasks + habits combined
  const totalItems = totalTasks + totalHabits;
  const doneItems = completedTasks + completedHabits;
  const overallPercent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  // XP system: each task = 10xp, each habit = 15xp, each study min = 2xp
  const xp = completedTasks * 10 + completedHabits * 15 + studyMinutesToday * 2;
  const xpGoal = 200;
  const xpPercent = Math.min(Math.round((xp / xpGoal) * 100), 100);

  // Dynamic message
  const getMessage = () => {
    if (overallPercent >= 100) return `Everything done. You're a machine, ${userName}.`;
    if (overallPercent >= 80) return `Almost there — ${100 - overallPercent}% left. Finish strong.`;
    if (overallPercent >= 50) return `You're ${overallPercent}% through today. Keep pushing.`;
    if (overallPercent >= 20) return `Good start, ${userName}. Build momentum.`;
    return `New day, new grind. Let's go, ${userName}.`;
  };

  return (
    <div className="progress-banner">
      <div className="banner-left">
        <h2 className="banner-title">Today's Progress</h2>
        <p className="banner-message">{getMessage()}</p>
        <div className="xp-bar-container">
          <span className="xp-label">Daily XP</span>
          <div className="xp-bar-track">
            <div
              className="xp-bar-fill"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
          <span className="xp-label" style={{ minWidth: 'auto', marginLeft: '8px' }}>{xp}/{xpGoal}</span>
        </div>
      </div>
      <div className="banner-right">
        <span className="progress-pct">{overallPercent}%</span>
        <span className="progress-label">DAY_PROGRESS_</span>
      </div>
    </div>
  );
};

export default ProgressBanner;
