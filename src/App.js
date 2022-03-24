import './App.css';
import {Routes, Route} from 'react-router-dom';
import Box from '@mui/material/Box';

//Components
import NavBar from './componets/NavBar';

//Forms
import LoginForm from './forms/LoginForm';
import EditForm from './forms/EditForm';
import RegisterForm from './forms/RegisterForm';
import AddRecipeForm from './forms/AddRecipeForm';

//Views
import Login from './views/Login';
import Logout from './views/Logout';
import Home from './views/Home';
import Register from './views/Register';
import EditProfile from './views/EditProfile';

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{minHeight:'90vh'}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/edit_profile" element={<EditProfile/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes> 

      </Box>
    </>
  );
}

export default App;
