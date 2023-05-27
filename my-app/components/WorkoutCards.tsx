'use client';

import { useSession } from 'next-auth/react';
import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Pagination } from "@mui/material";
import WorkoutCard from './WorkoutCard';

type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

type Workout = {
    _id: number,
    name: string,
    date: string,
    exercises: ExerciseName[]
}

const WorkoutCards = () => {
    const { data: session } = useSession();
    const [workouts, setWorkouts] = React.useState<Workout[]>([]);
    const [length, setLength] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(1);

    async function getWorkoutLength() {
        if (!session?.user.email) {
            return;
        }

        const response = await fetch(`api/workouts/length`, {
            credentials: 'include',
        });

        if (!response.ok) {
            //TODO error response
            console.log(`error: ${response.statusText}`);
            return;
        }
        
        const length = await response.json();
        setLength(length);
    }

    async function getWorkouts() {
        if (!session?.user.email) {
            return;
        }

        const response = await fetch(`api/workouts/${page-1}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            //TODO error response
            console.log(`error: ${response.statusText}`);
            return;
        }
        
        const workouts = await response.json();
        setWorkouts(workouts);
    }

    const deleteWorkout = async ( id: number ) => {
        await fetch(`api/workouts/id/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        });

        getWorkouts();
    }

    const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    }

    React.useEffect(() => {
        getWorkouts();

        return;
    }, [page]);

    React.useEffect(() => {
        getWorkoutLength();

        return;
    }, []);
    
    return (
        <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <Grid container spacing={2}>
                {workouts.map((workout: Workout) => (
                    <Grid key={"grid-" + workout._id} item xs={12}>
                        {workout.name}
                        <WorkoutCard 
                            workoutId={workout._id} 
                            name={workout.name} 
                            date={workout.date} 
                            exerciseNames={workout.exercises} 
                            deleteWorkout={deleteWorkout}/>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={Math.ceil(length / 5)} shape="rounded" onChange={handlePagination}/>

        </Box>
    )
}

export default WorkoutCards