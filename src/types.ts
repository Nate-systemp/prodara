export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface HabitItem {
  id: string;
  name: string;
  completedToday: boolean;
  streak: number;
  lastSevenDays: boolean[]; // [6 days ago ... today]
}
