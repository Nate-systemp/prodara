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
    <div className="dashboard-container">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-greeting">
            {userName}<span className="period">.</span>
          </h1>
          <span className="dash-date">{dateStr.toUpperCase()}</span>
        </div>
        <div className="dash-header-right">
          <span className="dash-time-label">ACTIVE_SESSION</span>
          <div className="dash-avatar">{userName.charAt(0).toUpperCase()}</div>
        </div>
      </div>

      <div className="dash-grid-bento">
        {/* Progress Banner Area */}
        <div className="progress-banner-wrap">
          <ProgressBanner
            userName={userName}
            tasks={tasks}
            habits={habits}
            studyMinutesToday={studyMinutes}
          />
        </div>

        {/* Quick Stats Area */}
        <div className="stats-mini-wrap">
          <QuickStats
            tasks={tasks}
            studyMinutesToday={studyMinutes}
            habits={habits}
          />
        </div>

        {/* Tasks Area */}
        <div className="tasks-wrap">
          <TodayTasks tasks={tasks} onToggleTask={onToggleTask} />
        </div>

        {/* Study Timer Area */}
        <div className="timer-wrap">
          <StudyTimer onSessionEnd={onStudySessionEnd} />
        </div>

        {/* Habits Area */}
        <div className="habits-wrap">
          <HabitCheckin habits={habits} onToggleHabit={onToggleHabit} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;