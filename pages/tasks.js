// pages/tasks.js
import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/items');
      const data = await response.json();
      setTasks(data);
    }

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const response = await fetch(`/api/deleteTask/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        alert('Failed to delete task');
      }
    }
  };

  const handleEdit = (taskId) => {
    router.push(`/update/${taskId}`);
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          All Tasks
        </Typography>
      </Box>

      <List>
        {tasks.length === 0 ? (
          <Typography>No tasks available.</Typography>
        ) : (
          tasks.map((task) => (
            <ListItem key={task._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={task.title}
                secondary={task.description ? task.description : 'No description'}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(task._id)}
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}
