import { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import TimerPage from "./pages/TimerPage";
import HabitsPage from "./pages/HabitsPage";
import SettingsPage from "./pages/SettingsPage";
import WelcomeScreen from "./components/WelcomeScreen";
import type { TaskItem, HabitItem } from "./types";

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

function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState("Dashboard");
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [habits, setHabits] = useState<HabitItem[]>(INITIAL_HABITS);
  const [studyMinutes, setStudyMinutes] = useState(0);

  const handleWelcomeComplete = (name: string) => {
    setUserName(name);
  };

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

  const handleAddTask = (title: string, category: string) => {
    const newTask: TaskItem = {
      id: `t${Date.now()}`,
      title,
      completed: false,
      category,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTask = (id: string, updates: Partial<TaskItem>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  if (!userName) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  const renderView = () => {
    switch (currentView) {
      case "Dashboard":
        return (
          <Dashboard 
            userName={userName} 
            tasks={tasks}
            habits={habits}
            studyMinutes={studyMinutes}
            onToggleTask={handleToggleTask}
            onToggleHabit={handleToggleHabit}
            onStudySessionEnd={handleStudySessionEnd}
          />
        );
      case "Tasks":
        return (
          <TasksPage 
            tasks={tasks} 
            onToggleTask={handleToggleTask} 
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        );
      case "Timer":
        return <TimerPage studyMinutes={studyMinutes} onSessionEnd={handleStudySessionEnd} />;
      case "Habits":
        return <HabitsPage habits={habits} onToggleHabit={handleToggleHabit} />;
      case "Settings":
        return <SettingsPage userName={userName} onNameChange={setUserName} />;
      default:
        return <Dashboard 
          userName={userName} 
          tasks={tasks}
          habits={habits}
          studyMinutes={studyMinutes}
          onToggleTask={handleToggleTask}
          onToggleHabit={handleToggleHabit}
          onStudySessionEnd={handleStudySessionEnd}
        />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </DashboardLayout>
  );
}

export default App;