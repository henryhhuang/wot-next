'use client';

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { setRef, TextField } from "@mui/material";

type Set = {
    _id?: number,
    weight: number,
    reps: number
}

interface Props {
    _id: number
    name: string,
    sets: Set[],
    addSet?: (values: {
        _id: number,
        set: Set
    }) => void;
    removeSet?: (values: {
        _id: number,
        setId: number
    }) => void;
}

const WotTable: React.FC<Props> = ( { _id, name, sets, addSet, removeSet}  ) => {
	const weightRef = React.useRef<HTMLInputElement>(null);
    const repsRef = React.useRef<HTMLInputElement>(null);

	const handleAdd = () => {

        if (weightRef.current && repsRef.current && weightRef.current.value && repsRef.current.value) {
            //todo error check
            addSet?.({
                _id: _id,
                set: {
                    weight: Number(weightRef.current.value),
                    reps: Number(repsRef.current.value)
                }
            })

            weightRef.current.value = "";
            repsRef.current.value = "";

            return;
        }

        console.log("Weight and reps are required");
    }

	const handleRemove = (id: number) => {
        if (id != 0) {
			console.log(_id, id);
            removeSet?.({
                _id: _id,
                setId: id
            })
            return;
        }

        console.log("Failed to remove set")
    }


	return (
		<TableContainer sx={{paddingBottom: "10px"}} >
			{name}
			<Table size="small" aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell align="right">Weight</TableCell>
					<TableCell align="right">Reps</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
					{
						sets.map((set: Set, index: number) => (
							<TableRow
							key={name + "-set-" + index}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="right">{set.weight}</TableCell>
								<TableCell align="right">{set.reps}</TableCell>
								<TableCell sx={{padding: "0px 10px 0px 0px"}} align="left">
									<IconButton sx={{padding: "0px"}} onClick={() => {
										handleRemove(set._id || 0);
									}}>
										<RemoveIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))
					}
					<TableRow
					sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell align="right">
							<TextField 
								variant="standard" 
								size="small" 
								inputProps={{
									sx: {
										textAlign: "right",
										"&::placeholder": {
										textAlign: "right",
										},
										disableUnderline: true,
										fontSize: 14
								},}}
								inputRef={weightRef}
							/>    
						</TableCell>
						<TableCell align="right" >
							<TextField 
								variant="standard" 
								size="small" 
								inputProps={{
									sx: {
										textAlign: "right",
										"&::placeholder": {
										textAlign: "right",
										},
										disableUnderline: true,
										fontSize: 14
								},}}
								inputRef={repsRef}
							/>                                       
						</TableCell>
						<TableCell sx={{padding: "0px 10px 0px 0px"}} align="left">
							<IconButton sx={{padding: "0px"}} onClick={() => {
								handleAdd();
							}}>
								<AddIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
  	)
}

export default WotTable