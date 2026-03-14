import QuickStats from "../components/dashboard/QuickStats";
import TodayTasks from "../components/dashboard/TodayTasks";
import StudyTimer from "../components/dashboard/StudyTimer";
import HabitCheckin from "../components/dashboard/HabitCheckin";
import ProgressBanner from "../components/dashboard/ProgressBanner";
import type { TaskItem, HabitItem } from "../types";
import "./Dashboard.css";

interface DashboardProps {
  userName: string;
  tasks: TaskItem[];
  habits: HabitItem[];
  studyMinutes: number;
  onToggleTask: (id: string) => void;
  onToggleHabit: (id: string) => void;
  onStudySessionEnd: (minutes: number) => void;
}

const Dashboard = ({ 
  userName, 
  tasks, 
  habits, 
  studyMinutes, 
  onToggleTask, 
  onToggleHabit, 
  onStudySessionEnd 
}: DashboardProps) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="brutal-dashboard">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-greeting">
            {userName}<span className="period">.</span>
          </h1>
          <span className="dash-date">{dateStr.toUpperCase()}</span>
        </div>
        <div className="dash-header-right">
          <span className="dash-time-label">SESSION</span>
          <span className="dash-avatar">{userName.charAt(0).toUpperCase()}</span>
        </div>
      </div>

      {/* Progress Banner */}
      <ProgressBanner
        userName={userName}
        tasks={tasks}
        habits={habits}
        studyMinutesToday={studyMinutes}
      />

      {/* Quick Stats */}
      <QuickStats
        tasks={tasks}
        studyMinutesToday={studyMinutes}
        habits={habits}
      />

      {/* Main Grid: Tasks + Study Timer */}
      <div className="dash-grid">
        <TodayTasks tasks={tasks} onToggleTask={onToggleTask} />
        <StudyTimer onSessionEnd={onStudySessionEnd} />
      </div>

      {/* Habits */}
      <HabitCheckin habits={habits} onToggleHabit={onToggleHabit} />
    </div>
  );
};

export default Dashboard;