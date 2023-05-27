'use client';

import React from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { useRouter } from "next/navigation";


type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

const CreateWorkout = () => {
    const [values, setValues] = React.useState<any>([]);
    const [exercises, setExercises] = React.useState<ExerciseName[]>([]);

    const router = useRouter();

    React.useEffect(() => {
        async function getExerciseNames() {
            const response = await fetch("api/exercises/names");

            if (!response.ok) {
                //TODO error response
                console.log(`error: ${response.statusText}`);
                return;
            }
            
            const exercises = await response.json();
            setExercises(exercises);
        }

        getExerciseNames();

        return;
    }, []);
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // TODO: refactor to a module
        await fetch("api/workouts", {
            method: "POST",
            body: JSON.stringify({
                name: data.get('workoutName'),
                date: new Date(),
                exercises: values
            }),
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        });

        router.back();
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography component="h1" variant="h5">
                    Create a Workout
                </Typography>
                <Box component="form" width="100%" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                    name="workoutName"
                                    required
                                    fullWidth
                                    id="workoutName"
                                    label="Workout Name"
                                    autoFocus/>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                disablePortal
                                fullWidth
                                disableClearable
                                clearOnBlur
                                id="exercises"
                                value={values}
                                //TODO: handle duplicates
                                onChange={(event, newValue) => {          
                                    let addedValue = newValue.slice(-1)[0];
                                    console.log(addedValue);
                                    if (addedValue && typeof addedValue === "string") {
                                        setValues((prevValues: any) => [...prevValues, {
                                            name: addedValue,
                                        }])  
                                    } else if (addedValue) {
                                        setValues((prevValues: any) => [...prevValues, addedValue])                              
                                    }
    
                                }}
                                //TODO: probably a better way to do this
                                // onChange={(event, newValue) => {
                                //     setValues(prevValues => [...prevValues, newValue.slice(-1)[0]])
                                //   }}
                                options={exercises}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                      return option;
                                    }      
                                    // Regular option
                                    return option.name;
                                  }}
                                renderTags={(values: ExerciseName[], getTagProps) =>
                                    values.map((option: ExerciseName, index: number) => (
                                      <Chip variant="outlined" label={option.name} {...getTagProps({ index })} 
                                        onDelete={() => {
                                            setValues(values.filter(entry => entry.name !== option.name));
                                      }} />
                                    ))}                     
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        autoFocus
                                        label="Exercises"
                                    />
                                )} 
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}>
                        Create
                    </Button>
                </Box>
            </Box>
        </Container>
  )
}

export default CreateWorkout;