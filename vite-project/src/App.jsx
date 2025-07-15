
import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
 import TaskList from "./components/TaskList";

function App() {
   const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
     .then(data => setTasks(data));
 }, []);

  const addTask = (newTask) => {
    fetch("http://localhost:3000/tasks", {
    method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
     .then(added => setTasks([...tasks, added]));
   };

  const deleteTask = (id) => {
     fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" })
       .then(() => setTasks(tasks.filter(task => task.id !== id)));
   };

   const toggleComplete = (id, completed) => {
     fetch(`http://localhost:3000/tasks/${id}`, {
       method: "PATCH",
       headers: {
        "Content-Type": "application/json"      },
       body: JSON.stringify({ completed: !completed })
    })
     .then(res => res.json())
     .then(updated => {
       setTasks(tasks.map(t => t.id === id ? updated : t));
     });
   };

   return (
     <div className="App">
       <h1>Task Tracker</h1>
       <TaskForm onAdd={addTask} />
       <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleComplete} />
     </div>
   );
 }

 export default App;

 