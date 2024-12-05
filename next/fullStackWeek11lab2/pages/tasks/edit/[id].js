import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    collaborators: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => setTask(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Task</h1>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="text"
        name="collaborators"
        value={task.collaborators}
        onChange={handleChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTask;
