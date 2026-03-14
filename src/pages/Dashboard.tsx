import { useState } from "react";
import QuickStats from "../components/dashboard/QuickStats";
import TodayTasks from "../components/dashboard/TodayTasks";
import StudyTimer from "../components/dashboard/StudyTimer";
import HabitCheckin from "../components/dashboard/HabitCheckin";
import ProgressBanner from "../components/dashboard/ProgressBanner";
import type { TaskItem, HabitItem } from "../types";
import "./Dashboard.css";

interface DashboardProps {
  userName: string;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", title: "Review Chapter 5 Notes", completed: false, category: "Study" },
  { id: "t2", title: "Complete Math Problem Set", completed: false, category: "Study" },
  { id: "t3", title: "Submit Lab Report Draft", completed: true, category: "School" },
  { id: "t4", title: "Read 25 Pages of Novel", completed: false, category: "Reading" },
  { id: "t5", title: "Practice Algorithm Questions", completed: false, category: "Coding" },
  { id: "t6", title: "Update Project Documentation", completed: true, category: "Coding" },
  { id: "t7", title: "Prepare Presentation Slides", completed: false, category: "School" },
];

const INITIAL_HABITS: HabitItem[] = [
  {
    id: "h1",
    name: "Morning Workout",
    completedToday: false,
    streak: 12,
    lastSevenDays: [true, true, true, false, true, true, false],
  },
  {
    id: "h2",
    name: "Read 30 Minutes",
    completedToday: false,
    streak: 5,
    lastSevenDays: [false, true, true, true, true, true, false],
  },
  {
    id: "h3",
    name: "Drink 8 Glasses Water",
    completedToday: false,
    streak: 3,
    lastSevenDays: [true, false, false, true, true, true, false],
  },
  {
    id: "h4",
    name: "No Social Media Before 12pm",
    completedToday: false,
    streak: 8,
    lastSevenDays: [true, true, true, true, true, true, false],
  },
  {
    id: "h5",
    name: "Journal Before Bed",
    completedToday: false,
    streak: 15,
    lastSevenDays: [true, true, true, true, true, true, false],
  },
];

const Dashboard = ({ userName }: DashboardProps) => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [habits, setHabits] = useState<HabitItem[]>(INITIAL_HABITS);
  const [studyMinutes, setStudyMinutes] = useState(0);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const newCompleted = !h.completedToday;
        const newDays = [...h.lastSevenDays];
        newDays[6] = newCompleted;
        return {
          ...h,
          completedToday: newCompleted,
          streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
          lastSevenDays: newDays,
        };
      })
    );
  };

  const handleStudySessionEnd = (minutes: number) => {
    setStudyMinutes((prev) => prev + minutes);
  };

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
        <TodayTasks tasks={tasks} onToggleTask={handleToggleTask} />
        <StudyTimer onSessionEnd={handleStudySessionEnd} />
      </div>

      {/* Habits */}
      <HabitCheckin habits={habits} onToggleHabit={handleToggleHabit} />
    </div>
  );
};

export default Dashboard;