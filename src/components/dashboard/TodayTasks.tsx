import type { TaskItem } from "../../types";

interface TodayTasksProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
}

const TodayTasks = ({ tasks, onToggleTask }: TodayTasksProps) => {
  const todayTasks = tasks.slice(0, 5); // Show top 5

  return (
    <div className="dash-panel tasks-panel">
      <div className="panel-header">
        <h3 className="panel-title">Today's Tasks</h3>
        <span className="panel-count">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
      </div>

      <div className="task-list">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? "done" : ""}`}
              onClick={() => onToggleTask(task.id)}
            >
              <div className="task-checkbox-refined">
                {task.completed && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="task-info">
                <span className="task-name">{task.title}</span>
                <span className="task-category">{task.category}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">No tasks for today. Chill out?</p>
        )}
      </div>

      <a href="#" className="view-all-link">
        View All Tasks <span>→</span>
      </a>
    </div>
  );
};

export default TodayTasks;
