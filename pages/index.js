// pages/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const response = await fetch('/api/me');
      const data = await response.json();
      setLoggedIn(data.loggedIn);
    }

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout');
    setLoggedIn(false);
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome to Task Manager
        </Typography>

        {!loggedIn ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/login')}
              style={{ marginRight: '10px' }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push('/register')}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/tasks')}
              style={{ marginRight: '10px' }}
            >
              View Tasks
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push('/create')}
            >
              Create Task
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              style={{ marginLeft: '10px' }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
