import type { TaskItem, HabitItem } from "../../types";

interface QuickStatsProps {
  tasks: TaskItem[];
  studyMinutesToday: number;
  habits: HabitItem[];
}

const QuickStats = ({ tasks, studyMinutesToday, habits }: QuickStatsProps) => {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const taskPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Current habit streak = minimum streak across all habits (or max, your pick)
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

  // Weekly goal: let's say goal is 35 tasks/week, track completed
  const weeklyGoal = 35;
  const weeklyDone = completedTasks + 12; // simulating past days
  const weeklyPercent = Math.min(Math.round((weeklyDone / weeklyGoal) * 100), 100);

  const studyHours = (studyMinutesToday / 60).toFixed(1);

  const stats = [
    {
      id: "tasks",
      label: "Tasks Done",
      value: `${completedTasks}/${totalTasks}`,
      sub: `${taskPercent}% complete`,
      accent: false,
    },
    {
      id: "study",
      label: "Focused Time",
      value: `${studyHours}h`,
      sub: `${studyMinutesToday} min today`,
      accent: false,
    },
    {
      id: "streak",
      label: "Best Streak",
      value: `${maxStreak}`,
      sub: maxStreak > 0 ? "days running" : "start today",
      accent: false,
    },
    {
      id: "weekly",
      label: "Weekly Goal",
      value: `${weeklyPercent}%`,
      sub: `${weeklyDone}/${weeklyGoal} tasks`,
      accent: true,
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={stat.id} className={`stat-card ${stat.accent ? "invert" : ""}`}>
          <div className="stat-header">
            <span className="stat-title">{stat.label}</span>
          </div>
          <span className="stat-value">{stat.value}</span>
          <div className="stat-footer">
            <span className="stat-meta">{stat.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
