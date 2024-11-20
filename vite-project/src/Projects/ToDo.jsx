import "./ToDo.css";
import { useState } from "react";

function ToDo() {
  const [todolist, setToDoList] = useState([
    { id: 1, task: "learn react" },
    { id: 2, task: "learn node" },
  ]);
  const [inputValue, setInputValue] = useState(""); // For new tasks or updates
  const [isEditing, setIsEditing] = useState(false); // To toggle between adding and editing
  const [currentTaskId, setCurrentTaskId] = useState(null); // To track the task being edited

  function addOrUpdateTask() {
    if (inputValue !== "") {
      if (isEditing) {
        // Update an existing task
        const updatedTasks = todolist.map((todo) =>
          todo.id === currentTaskId ? { ...todo, task: inputValue } : todo
        );
        setToDoList(updatedTasks);
        setIsEditing(false); // Exit edit mode
        setCurrentTaskId(null); // Clear current task ID
      } else {
        // Add a new task
        const newTask = {
          id: todolist.length + 1,
          task: inputValue,
        };
        setToDoList([...todolist, newTask]);
      }
      setInputValue(""); // Clear input field
    } else {
      alert("Add some tasks");
    }
  }

  function editTask(id, currentText) {
    setIsEditing(true); // Enable edit mode
    setCurrentTaskId(id); // Set the task ID to edit
    setInputValue(currentText); // Pre-fill the input field with the current task text
  }

  function deleteTask(id) {
    const updatedList = todolist.filter((todo) => todo.id !== id);
    setToDoList(updatedList);
  }

  return (
    <div className="container mt-5 w-25">
      <h2 className="text-center">To Do App</h2>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addOrUpdateTask} className="btn btn-primary">
          {isEditing ? "Update" : "Add"} {/* Button text changes based on mode */}
        </button>
      </div>
      <ul className="list-group mt-4">
        {todolist.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between"
          >
            <p>{todo.task}</p>
            <div>
              <button
                onClick={() => editTask(todo.id, todo.task)}
                className="btn btn-warning me-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
