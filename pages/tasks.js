// pages/tasks.js
import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/items');
      const data = await response.json();
      setTasks(data);
    }

    fetchTasks();
  }, []);

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
            <ListItem key={task._id}>
              <ListItemText primary={task.title} />
              <ListItemText primary={task.description} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}
