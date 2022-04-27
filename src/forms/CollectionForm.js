import React, {useState} from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
import useCreateBox from '../hooks/useCreateBox';
// import useEditBox from '../hooks/useEditBox';
// import useDeleteBox from '../hooks/useDeleteBox';

const FormSchema =Yup.object(
   {
       "name":Yup.string().required("Required")
    }
)

export default function CollectionForm({ collection }) {

    const [newBox, setNewBox] = useState({})
    const [editBox, setEditBox] = useState({})
    const [deleteBox, setDeleteBox] = useState({})

    useCreateBox(newBox)
    // useEditBox(editBox)
    // useDeleteBox(deleteBox)
    const initialValues ={
        name:collection?.name ?? ''
    };

    const handleSubmit =(values, resetForm)=>{
        if (!collection){
            setNewBox(values)
        }else{
            setEditBox({...values, id:collection.id})
        }
        console.log(values)
        resetForm(initialValues);
    }

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:FormSchema,
        onSubmit:(values, {resetForm})=>{handleSubmit(values, resetForm)},
        enableReinitialize:true

    })

    const handleDelete=()=>{
        setDeleteBox(collection)
    }

  return (
    <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="name"
            name="name"
            type="text"
            sx={{mb:2, mt:2}}
            label="Name"
            placeholder="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
        />
        <Button type="submit" sx={{width:"100%", my:1}}>{collection?'Edit RecipeBox':'Create RecipeBox'}</Button>
        <Button color="error" onClick={()=>handleDelete()} sx={{ my:1}}>Delete RecipeBox</Button>
    </form>
  )
}