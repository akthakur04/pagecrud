'use client';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Container, Typography, Button, List, ListItem, Box } from '@mui/material';
// import Link from 'next/link';

export default function ViewTasks() {
    //   const [tasks, setTasks] = useState([]);
    const [items, setItems] = useState([]);
    function fetchData() {
        fetch('/api/todo').then(response => response.json()).then((data) => { setItems(data) });
    }
    useEffect(() => {
        fetchData();
    }, []);


    // const handleDelete = async (id) => {
    //     const res = await fetch(`/api/tasks/delete/${id}`, {
    //         method: 'DELETE',
    //     });

    //     if (res.ok) {
    //         // Remove the deleted task from the local state
    //         setTasks((prevTasks) => prevTasks.filter((task) => items._id !== id));
    //     }
    // };

    console.log(items)
    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Tasks
            </Typography>
            {items && items?.length === 0 ? (
                <Typography variant="body1">No tasks available.</Typography>
            ) : (
                <List>
                    {items && items?.map((task) => (
                        <ListItem key={items._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="h6" color="black">{items?.title}</Typography>
                                <Typography variant="body2">{items?.description}</Typography>
                            </Box>
                            <Box>
                                {/* <Link href={`/tasks/update/${items._id}`}> */}
                                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                    Update
                                </Button>
                                {/* </Link> */}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                //   onClick={() => handleDelete(items._id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}
