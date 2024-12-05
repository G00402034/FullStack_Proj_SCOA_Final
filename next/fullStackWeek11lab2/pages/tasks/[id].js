import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TaskDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => setTask(data));
    }
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <Link href={`/tasks/edit/${id}`}>Edit Task</Link>
    </div>
  );
};

export default TaskDetails;
