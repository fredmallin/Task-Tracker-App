
import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: title.trim(),
      completed: false,
    };

    
    if (newTask.title === "") return;

    
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddTask(data); 
        setTitle("");    
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
