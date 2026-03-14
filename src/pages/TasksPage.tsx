import { useState } from "react";
import type { TaskItem } from "../types";
import "./TasksPage.css";

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
          <h3 className="panel-title">ADD NEW TASK</h3>
        </div>
        <form className="add-task-form-refined" onSubmit={handleSubmit}>
          <input
            type="text"
            className="brutal-input-refined"
            placeholder="TASK TITLE..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <select 
            className="brutal-select-refined"
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
          >
            <option value="Study">STUDY</option>
            <option value="School">SCHOOL</option>
            <option value="Coding">CODING</option>
            <option value="Reading">READING</option>
            <option value="Life">LIFE</option>
          </select>
          <button type="submit" className="btn-create-refined">+ CREATE</button>
        </form>
      </div>

      <div className="panel master-list-refined" style={{ marginTop: '30px' }}>
        <div className="panel-header">
          <h3 className="panel-title">MASTER LIST</h3>
          <span className="panel-count" style={{ fontWeight: 800 }}>{tasks.filter(t => t.completed).length}/{tasks.length}</span>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item-refined ${task.completed ? "done" : ""}`}
            >
              <div className="task-main-row-refined" onClick={() => onToggleTask(task.id)}>
                <div className="task-checkbox-refined">
                  {task.completed && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="task-info-refined">
                  {editingId === task.id ? (
                    <input 
                      className="edit-input-refined"
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
                    <span className="task-name-refined">{task.title}</span>
                  )}
                  <span className="task-category-refined">{task.category}</span>
                </div>
              </div>
              
              <div className="task-actions-refined">
                {editingId === task.id ? (
                  <button className="action-btn-refined save" onClick={(e) => { e.stopPropagation(); saveEdit(task.id); }}>✔</button>
                ) : (
                  <button className="action-btn-refined edit" onClick={(e) => { e.stopPropagation(); startEditing(task); }}>✎</button>
                )}
                <button className="action-btn-refined delete" onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
