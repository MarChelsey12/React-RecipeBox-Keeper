import React from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray} from 'formik';
import Button from '../componets/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';


export const AddRecipeForm = () => (
    <>
      <h1>Add a new recipe!</h1>
      <Formik
        initialValues={{
          title: '',
          ingredients: [{QTY: "1", measurement: "cup", ingredient: "sugar"}],
          instructions: '',
          collection_name: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('Required'),
          ingredients: Yup.array().of(Yup.object({ingredient: Yup.string().required('Required')
                })
              ),
          instructions: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          collection_name: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
        })}
        onSubmit={(data, {resetForm}) => {
            console.log(data);
            resetForm();
        }}
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field placeholder="Title" name="title" type="input" as={TextField} />

                <FieldArray name="ingredients"> 
                {(arrayHelpers) => (
                  <div>
                    <IconButton 
                        onClick={() => 
                          arrayHelpers.push({
                              QTY: '', 
                              measurement: '', 
                              ingredient: ''
                          })
                        }
                    >
                        <AddCircleIcon />
                    </IconButton>
                        {values.ingredients.map((ingredients, index) => {                          
                          return (
                            <div key={index}>    
                              <Field placeholder="QTY" name="ingredients" type="input" as={TextField} />
                              <Field placeholder="tsp" name={`ingredients.[${index}].measurement`} type="select" as={Select}>
                                <MenuItem/>
                                <MenuItem/>
                                <MenuItem/>
                              </Field>
                              <Field placeholder="Ingredient" name="ingredients" type="input" as={TextField} />
                              <IconButton onClick={() => arrayHelpers.remove(index)}>
                                <ClearIcon />
                              </IconButton>
                            </div>
                          );
                        })}
                
                
                  </div>)}
                </FieldArray>

                <Field placeholder="Cooking Directions" name="instructions" type="input" as={TextField} sx={{width:'100%'}} />
                <div>
                <Field placeholder="RecipeBox" name="collection_name" type="input" as={Select} >
                    <MenuItem/>
                    <MenuItem/>
                    <MenuItem/>
                </Field>
                </div>
            <div>
            <Button type="submit">Submit</Button>
            </div>
            
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );