import React from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray, useField, ErrorMessage} from 'formik';
import Button from '../componets/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';


// const myErrorText =() => {
//     const [field, meta] = useField(placeholder, ...props);
//     const errorText = meta.error && meta.touched ? meta.error : '';

//     return(
//         <TextField {...field} 
//           placeholder={placeholder} 
//           helperText={errorText} 
//           error={!!errorText} 
//         />
//     )
// }
function AddRecipeForm() {
    const initialValues={
        title:'',
        ingredients:[{
            qty:'',
            unit:'',
            element:''
        }],
        instructions:'',
        collection_name:'',
        }
    const validationSchema= Yup.object({
        title: Yup.string()
            .required('Required'),
        ingredients: Yup.array().of(Yup.object({
            qty: Yup.string().required('Required'),
            element: Yup.string().required('Required')
                })
            ),
        instructions: Yup.string()
            .required('Required'),
        collection_name: Yup.string()
        .required('Required')
        })
    const onSubmit = values => console.log('Form data ', values)
    return(
        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        >
          {({ values, errors }) => (
            <form>
                <Field placeholder="Title" name="title" type="input" as={TextField} sx={{width:'100%', p:1}} />
                
                  <FieldArray name="ingredients" sx={{width:'100%'}} > 
                    {(arrayHelpers) => (
                    <div>
                        {values.ingredients.map((qty, unit, element, index) => {                          
                            return (
                            <div key={index} sx={{width:'100%'}}>    
                                <Field placeholder="QTY" name={`ingredients.${index}.qty`} type="input" as={TextField} sx={{p:1}} />
                                
                                <Field placeholder="TBSP" name={`ingredients.${index}.unit`} type="input" as={TextField} sx={{p:1}} />
                                
                                <Field placeholder="Ingredient" name={`ingredients.${index}.element`} type="input" as={TextField} sx={{p:1}} />
                                
                                <IconButton sx={{mt:2}} onClick={() => arrayHelpers.remove(index)}>
                                <ClearIcon />
                                </IconButton>
                            </div>
                            );
                        })}
                        <div>
                        <IconButton sx={{p:1}}
                            onClick={() => 
                            arrayHelpers.push({
                                QTY: '', 
                                unit: '', 
                                element: ''
                            })
                            }
                        >
                            <AddCircleIcon />
                        </IconButton>
                        </div>
                    </div>)}
                    </FieldArray>
                    <Field placeholder="Cooking Directions" name="instructions" type="input" as={TextField} sx={{width:'100%', p:1}} />
                    
                    <div>
                        <Field placeholder="RecipeBox" name="collection_name" type="input" as={Select} sx={{m:1}}>
                            <MenuItem/>
                            <MenuItem/>
                            <MenuItem/>
                        </Field>
                    </div>
                    <div>
                        <Button type="submit" sx={{width:'100%', m:1}}>Submit</Button>
                    </div>
                
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </form>
            )}
        </Formik>
            
    )
}
export default AddRecipeForm