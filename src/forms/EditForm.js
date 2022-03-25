import React, {useState} from 'react';
import Button from '../componets/Button';
import * as Yup from "yup";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import useEditUser from '../hooks/useEditUser';
import useDeleteUser from '../hooks/useDeleteUser';

const FormSchema = Yup.object(
    {
        username: Yup.string().required(),
        email: Yup.string().email("Must be a valid email format").required(),
        avatar: Yup.string(),
        password: Yup.string().required()
    }
)

export default function RegisterForm({user}) {

    const [editUser, setEditUser] = useState({})
    const [deleteUser, setDeleteUser] = useState({})

    useEditUser(editUser)
    useDeleteUser(deleteUser)

    const initialValues ={
        username: user?.username ?? '',
        email: user?.email ?? '',
        avatar: user?.avatar ?? '',
        password: ""
    }
    
    const handleSubmit=(values)=>{
        console.log(values,'df')
        setEditUser({...values, id:user.id})
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:FormSchema,
        onSubmit: (values)=>{handleSubmit(values)},
        
    })

    const handleDelete=()=>{
        setDeleteUser(user)
    }

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
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            // {...formik.getFieldProps('username')}
            
        />
        <TextField
            id="email"
            name="email"
            fullWidth
            sx={{mb:2, mt:2}}
            label="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            // {...formik.getFieldProps('email')}
        />
        <TextField
            id="avatar"
            name="avatar"
            type="text"
            fullWidth
            sx={{mb:2, mt:2}}
            label="avatar"
            placeholder="avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
            // {...formik.getFieldProps('avatar')}
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
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            // {...formik.getFieldProps('password')}
        />
        <Button type="submit">Edit Profile</Button>
        <Button color="error" onClick={()=>handleDelete()} sx={{my:1}}>Delete Profile?</Button>

    </form>
  )
}