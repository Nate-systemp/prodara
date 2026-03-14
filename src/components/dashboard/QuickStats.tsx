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
      label: "TASKS DONE",
      value: `${completedTasks}/${totalTasks}`,
      sub: `${taskPercent}% complete`,
      accent: completedTasks === totalTasks && totalTasks > 0,
    },
    {
      id: "study",
      label: "STUDY HOURS",
      value: `${studyHours}h`,
      sub: `${studyMinutesToday} min today`,
      accent: false,
    },
    {
      id: "streak",
      label: "BEST STREAK",
      value: `${maxStreak}`,
      sub: maxStreak > 0 ? "days running" : "start today",
      accent: maxStreak >= 7,
    },
    {
      id: "weekly",
      label: "WEEKLY GOAL",
      value: `${weeklyPercent}%`,
      sub: `${weeklyDone}/${weeklyGoal} tasks`,
      accent: weeklyPercent >= 100,
    },
  ];

  return (
    <div className="stats-row">
      {stats.map((stat, i) => (
        <div key={stat.id} className={`stat-card ${stat.accent ? "stat-accent" : ""}`}>
          <span className="stat-index">0{i + 1}</span>
          <span className="stat-label">{stat.label}</span>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-sub">{stat.sub}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
