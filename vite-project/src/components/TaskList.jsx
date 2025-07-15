import React from "react";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
            onClick={() => onToggle(task.id, task.completed)}
          >
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)}></button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
