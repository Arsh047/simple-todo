
import React, { useState } from 'react';
import { useTodo } from './TodoContext';
import './Todo.css';

function TodoList() {
  const { tasks, addTask, removeTask, toggleComplete } = useTodo();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ id: Date.now(), title: newTask, completed: false });
      setNewTask('');
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed-task' : ''}>
            <input
              type="checkbox"
              defaultChecked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span className="task-title">{task.title}</span>
            <button className="remove-button" onClick={() => removeTask(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
