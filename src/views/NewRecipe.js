import React from 'react';
import {Paper, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import AddRecipeForm from '../forms/AddRecipeForm';


export default function Home() {
  const theme=useTheme()

  return (
    <Paper sx={{m:5, p:5, justifyContent:"center", backgroundColor: theme.palette.background.paper, backgroundImage:theme.palette.background.paper}}>
        <>
          <Typography variant="h4">Add a Recipe!</Typography>
          <AddRecipeForm />
        </>
        
    </Paper>
  )
}