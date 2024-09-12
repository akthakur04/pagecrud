// pages/create.js
import { useState } from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      router.push('/tasks'); // Redirect to /tasks after task creation
    }
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Create New Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />
          </Box>

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
