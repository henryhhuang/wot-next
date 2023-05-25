'use client';

import React from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import WorkoutCards from '@/components/WorkoutCards';

const Home = () => {
    const { data: session } = useSession();

    return (
        <Container 
            component="main" 
            maxWidth="xs"
            sx = {{
                backgroundColor: '#fff'
        }}>
            {
                session?.user ? (
                    <Box>
                    <Link href='/create'>                
                        <Button>
                            <AddIcon />
                            Create
                        </Button>
                    </Link>
                    <WorkoutCards />
                </Box>
                ) : (
                    <Box>
                        <Typography>
                            Please sign in
                        </Typography>
                    </Box>
                )
            }
    </Container>
    )
}

export default Home