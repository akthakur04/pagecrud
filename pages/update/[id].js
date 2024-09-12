// pages/update/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function UpdateTask() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState(''); // Change task to title
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch the task details to pre-fill the form
      async function fetchTask() {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        setTitle(data.title); // Update to use 'title'
        setDescription(data.description);
        setLoading(false);
      }

      fetchTask();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTask = { title, description }; // Send title and description

    const response = await fetch(`/api/updateTask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask), // Update the body to send title and description
    });

    if (response.ok) {
      router.push('/tasks');
    } else {
      alert('Failed to update task');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Update Task</Typography>
      </Box>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Task Title"
          value={title} // Update to use title
          onChange={(e) => setTitle(e.target.value)} // Update setter
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Update Task
          </Button>
        </Box>
      </form>
    </Container>
  );
}
