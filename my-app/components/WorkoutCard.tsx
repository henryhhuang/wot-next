'use client';

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import WotTable from "../WotTable/WotTable";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns'
import WotTable from "./WotTable";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

type Set = {
    _id?: number,
    weight: number,
    reps: number
}

type Exercise = {
    _id: number,
    name: string,
    workoutId: number,
    sets: Set[]
}

type ExerciseName = {
    _id?: number,
    name: string,
    category?: string
}

interface Props {
    name: string,
    date: string,
    exerciseNames: ExerciseName[],
    workoutId: number,
    deleteWorkout?: (_id: number) => void;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const WorkoutCard: React.FC<Props> = ( {workoutId, name, date, exerciseNames, deleteWorkout} ) => {
	const [expanded, setExpanded] = React.useState(false);
    const [exercises, setExercises] = React.useState<Exercise[]>([]);

	async function getExercises() {
        const response = await fetch(`api/exercises/workout/${workoutId}`);

        if (!response.ok) {
            //TODO error response
            console.log(`error: ${response.statusText}`);
            return;
        }
        
        const exercises = await response.json();
        setExercises(exercises);
    }

	const addExercise = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await fetch(`api/exercises/`, {
            method: "POST",
            body: JSON.stringify({
                name: data.get('exerciseName'),
                workoutId: workoutId,
                sets: []
            }),
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        })

        getExercises();
    }

	const addSet = async ( values: any ) => {
		console.log(values);
        await fetch(`api/exercises/set/`, {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
        })

        getExercises();
    }

	const removeSet = async ( values: any ) => {
        await fetch(`api/exercises/set/`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
        });

        getExercises();
    }

	const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (!workoutId) {
            return
        }

        getExercises();

        return;
    }, [])

    return (
		<Card sx={{ minWidth: 275, border: 1 }}>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Typography sx={{ fontSize: 14 }} gutterBottom>
						{format(Date.parse(date), 'yyyy-MM-dd')}
					</Typography>
					<IconButton onClick={() => {
						deleteWorkout?.(workoutId);
					}}>
							<DeleteIcon />
					</IconButton>
				</Box>
				<Typography component="h1" variant="h6" sx={{ mb: 1.5 }}>
				{name}
				</Typography>
				<Typography component="div" variant="body2">
					{exerciseNames.map((exerciseName: ExerciseName) => (
					<Typography key={"typography-" + exerciseName.name} variant="body1">
						{bull}
						{exerciseName.name}
					</Typography>
					))}
				</Typography>
				<CardActions sx={{padding: "0px"}} onClick={handleExpandClick} disableSpacing>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						>
							<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
			</CardContent>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent sx={{ paddingTop: "0px" }}>
					{exercises.map((exercise: Exercise) => (
						<WotTable key={"wottable-" + exercise._id + "-" + exercise.name}
							_id={exercise._id} 
							name={exercise.name} 
							sets={exercise.sets} 
							addSet={addSet} 
							removeSet={removeSet} />
					))}
					<Box component="form" onSubmit={addExercise}>
						<TextField 
								size="small"
								name="exerciseName"
								id="exerciseName"
							/>
						<Button type="submit">
							<AddIcon />
							Add an exercise
						</Button>
					</Box>
				</CardContent>
			</Collapse>
		</Card>
    )
}

export default WorkoutCard