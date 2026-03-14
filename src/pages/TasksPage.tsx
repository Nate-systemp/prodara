import { useState } from "react";
import type { TaskItem } from "../types";

interface TasksPageProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask: (title: string, category: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<TaskItem>) => void;
}

const TasksPage = ({ tasks, onToggleTask, onAddTask, onDeleteTask, onUpdateTask }: TasksPageProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Study");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim(), newTaskCategory);
      setNewTaskTitle("");
    }
  };

  const startEditing = (task: TaskItem) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (id: string) => {
    onUpdateTask(id, { title: editTitle });
    setEditingId(null);
  };

  return (
    <div className="brutal-page tasks-manage-page">
      <h1>ALL_TASKS_CRUD</h1>

      {/* Create Task Form */}
      <div className="panel add-task-panel">
        <div className="panel-header">
          <h3 className="panel-title">ADD_NEW_TASK_</h3>
        </div>
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="brutal-input"
            placeholder="TASK_TITLE..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <select 
            className="brutal-select"
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
          >
            <option value="Study">STUDY</option>
            <option value="School">SCHOOL</option>
            <option value="Coding">CODING</option>
            <option value="Reading">READING</option>
            <option value="Life">LIFE</option>
          </select>
          <button type="submit" className="brutal-action-btn">+ CREATE</button>
        </form>
      </div>

      <div className="panel master-list-panel" style={{ marginTop: '30px' }}>
        <div className="panel-header">
          <h3 className="panel-title">MASTER_LIST_</h3>
          <span className="panel-count">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? "done" : ""}`}
            >
              <div className="task-main-row" onClick={() => onToggleTask(task.id)}>
                <div className="task-checkbox">
                  {task.completed && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="task-info">
                  {editingId === task.id ? (
                    <input 
                      className="edit-input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(task.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <span className="task-name">{task.title}</span>
                  )}
                  <span className="task-category">{task.category}</span>
                </div>
              </div>
              
              <div className="task-actions">
                {editingId === task.id ? (
                  <button className="action-icn save" onClick={() => saveEdit(task.id)}>✔</button>
                ) : (
                  <button className="action-icn edit" onClick={() => startEditing(task)}>✎</button>
                )}
                <button className="action-icn delete" onClick={() => onDeleteTask(task.id)}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .add-task-form {
          display: flex;
          gap: 15px;
          padding: 20px;
        }
        .brutal-input {
          flex: 1;
          padding: 10px 15px;
          border: 3px solid #0a0a0a;
          font-family: 'Space Mono', monospace;
          background: #fff;
          outline: none;
        }
        .brutal-select {
          padding: 10px;
          border: 3px solid #0a0a0a;
          font-family: 'Space Mono', monospace;
          background: #fff;
          font-weight: 700;
        }
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 15px;
        }
        .task-main-row {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 15px;
          cursor: pointer;
        }
        .edit-input {
          border: none;
          border-bottom: 2px solid #0a0a0a;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          width: 100%;
          outline: none;
        }
        .task-actions {
          display: flex;
          gap: 10px;
          opacity: 0.3;
          transition: opacity 0.2s;
        }
        .task-item:hover .task-actions {
          opacity: 1;
        }
        .action-icn {
          background: none;
          border: 2px solid #0a0a0a;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 900;
          transition: all 0.1s;
        }
        .action-icn:hover {
          background: #0a0a0a;
          color: #fff;
        }
        .action-icn.delete:hover {
          background: #ff4d4d;
          border-color: #ff4d4d;
        }
        .action-icn.save {
          background: #0a0a0a;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default TasksPage;
