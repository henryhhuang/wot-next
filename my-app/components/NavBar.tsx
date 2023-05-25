'use client';

import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Provider } from 'next-auth/providers';


const NavBar = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const { data: session } = useSession();
    
    useEffect(() => {
        (async () => {
            const response = await getProviders();

            setProviders(response);
        })();
    }, []);

    return (
    <Box>
        <AppBar color="inherit" elevation={0} position="static">
            <Toolbar>
                {session?.user ? (
                    <Typography sx={{ marginLeft: 'auto' }}>
                        {session?.user.email}
                    </Typography>
                ) : (
                    <>
                    {providers && 
                        Object.values(providers).map((provider: Provider) => (
                            <Button onClick={() => {
                                signIn(provider.id);
                            }} color="inherit" sx={{ marginLeft: 'auto' }}>Sign in</Button>
                        ))
                    }
                    </>
                )}
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default NavBar

