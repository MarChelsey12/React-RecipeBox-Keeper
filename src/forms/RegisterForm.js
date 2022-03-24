import React, {useState} from 'react';
import Button from '../componets/Button';
import * as Yup from "yup";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import useCreateUser from '../hooks/useCreateUser';

const FormSchema = Yup.object(
    {
        username: Yup.string().required(),
        email: Yup.string().email("Must be a valid email format").required(),
        password: Yup.string().required()
    }
)

const initialValues ={
    username:'',
    email:'',
    password: ''
}


export default function RegisterForm() {

    const [newUser, setNewUser] = useState({})
    const [error, setError] = useState('')

    useCreateUser(newUser, setError)
    
    const handleSubmit=(values)=>{
        setNewUser(values)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:FormSchema,
        onSubmit:(values)=>{handleSubmit(values)},
    })


  return (
    <form onSubmit={formik.handleSubmit}>
        <TextField
            id="username"
            name="username"
            type="text"
            fullWidth
            sx={{mb:2, mt:2}}
            label="username"
            placeholder="username"
            value={formik.values.username}
            {...formik.getFieldProps('username')}
        />
        <TextField
            id="email"
            name="email"
            fullWidth
            sx={{mb:2, mt:2}}
            label="email"
            placeholder="email"
            value={formik.values.email}
            {...formik.getFieldProps('email')}
        />
        <TextField
            id="password"
            name="password"
            type="password"
            fullWidth
            sx={{mb:2, mt:2}}
            label="password"
            placeholder="password"
            value={formik.values.password}
            {...formik.getFieldProps('password')}
        />
        <Button type="submit" sx={{width:"100%", my:1}}>Create Account</Button>
        {error}
    </form>
  )
}