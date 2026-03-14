import type { TaskItem } from "../../types";

interface TodayTasksProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
}

const TodayTasks = ({ tasks, onToggleTask }: TodayTasksProps) => {
  const topTasks = tasks.slice(0, 5);

  return (
    <div className="panel today-tasks">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="panel-index">02</span>
          <h3 className="panel-title">TODAY'S TASKS</h3>
        </div>
        <span className="panel-count">{tasks.filter((t) => t.completed).length}/{tasks.length}</span>
      </div>

      <div className="task-list">
        {topTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "done" : ""}`}
            onClick={() => onToggleTask(task.id)}
          >
            <div className="task-checkbox">
              {task.completed && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <div className="task-info">
              <span className="task-name">{task.title}</span>
              <span className="task-category">{task.category}</span>
            </div>
          </div>
        ))}
      </div>

      {tasks.length > 5 && (
        <div className="panel-footer">
          <span className="view-all">VIEW ALL TASKS →</span>
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
