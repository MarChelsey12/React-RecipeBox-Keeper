import React, {useState, useContext} from 'react';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import ThemeSwitch from './ThemeSwitch';
import {AppContext} from '../context/AppContext';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';


export default function MenuAppBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {user, bookList} = useContext(AppContext);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RecipeBox Keeper
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user?.token ?
              <Stack>
                  <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">
                        <Link to='/logout' style={{textDecoration:"none"}}>
                          Logout
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">
                        <Link to='/edit_profile' style={{textDecoration:"none"}}>
                          Edit Profile
                        </Link>
                      </Typography>
                    </MenuItem>
              </Stack>
                    :
              <Stack>
                    <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">
                        <Link to='/login' style={{textDecoration:"none"}}>
                          Login
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Typography textAlign="center">
                        <Link to='/register' style={{textDecoration:"none"}}>
                          Create Account
                        </Link>
                      </Typography>
                  </MenuItem>
              </Stack>   
                }
              </Menu>
            </div>
            </Toolbar>
            </AppBar>
        <div>
          <Drawer
                anchor='left'
                open={open}
                onClick={handleDrawerClose}
          >
            <Box
                sx={{ width:'auto' }}
                role="presentation"
                onClick={handleDrawerClose}
            >
            <List>
            {['All Recipes', 'My RecipeBox'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <ListAltIcon /> : <InventoryIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            </List>
              <Divider />
              <List>
                {['Add New Recipe', 'Create New RecipeBox'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <PlaylistAddCircleIcon /> : <AddBoxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
                  <ListItem sx={{position:"absolute", alignContent:"center", justifyContent:"center"}}>
                    <ThemeSwitch/>
                  </ListItem>
              </List>
            </Box>
          </Drawer>
        </div>
    </Box>
  );
}