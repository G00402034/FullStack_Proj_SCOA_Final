import Link from 'next/link';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Task Dashboard</h1>
      <input
        type="text"
        placeholder="Filter tasks"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {filteredTasks.map((task) => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <Link href={`/tasks/${task._id}`}>View Details</Link>
          </div>
        ))}
      </div>
      <Link href="/tasks/new">Create New Task</Link>
    </div>
  );
};

export default Dashboard;
