import React from 'react';
import EditForm from '../forms/EditForm';
import {Paper, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {AppContext} from '../context/AppContext';
export default function EditProfile() {
  const theme=useTheme()
  const {user} = React.useContext(AppContext)

  return (
    <Paper sx={{m:5, p:5, justifyContent:"center", backgroundColor: theme.palette.background.paper, backgroundImage:theme.palette.background.paper}}>
        <Typography variant="h4">Edit Profile</Typography>
        <EditForm user = {user}/>
    </Paper>
  )
}