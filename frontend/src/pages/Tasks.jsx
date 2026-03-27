import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://task-app-4rb8.onrender.com/api/tasks",
        {
          headers: { Authorization: token },
        }
      );

      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  const addTask = async () => {
    setError("");
    setSuccess("");

    if (!title) {
      setError("Task title is required");
      return;
    }

    try {
      const res = await axios.post(
        "https://task-app-4rb8.onrender.com/api/tasks",
        { title },
        {
          headers: { Authorization: token },
        }
      );

      setSuccess(res.data.msg);
      setTitle("");
      fetchTasks();

    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Task List</h2>

      <button onClick={handleLogout}>Logout</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id}>
              {task.title} - {task.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
