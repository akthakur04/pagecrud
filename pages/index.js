// pages/index.js
import { Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleCreateTask = () => {
    router.push('/create'); // Redirect to /create page
  };

  const handleViewTasks = () => {
    router.push('/tasks'); // Redirect to /tasks page
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Task Manager
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCreateTask} // Redirects to create task page
            style={{ marginRight: '20px' }}
          >
            Create Task
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleViewTasks}
          >
            View All Tasks
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
