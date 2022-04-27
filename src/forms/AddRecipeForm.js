import React from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, FieldArray, useField} from 'formik';
import Button from '../componets/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

export default function AddRecipeForm() {
    const initialValues={
        title:'',
        ingredients:[{ qty:'', unit:'', element:'' }],
        instructions:'',
        collection_name:'',
        }
    const validationSchema= Yup.object({
        title: Yup.string().required('Required'),
        ingredients: Yup.array().of(Yup.object({
            qty: Yup.string().required('Required'),
            unit: Yup.string(),
            element: Yup.string().required('Required')
                })),
        instructions: Yup.string().required('Required'),
        collection_name: Yup.string().required('Required')
        })
    const MyTextField = ({placeholder, ...props}) => {
            const [field, meta] = useField(props);
            const errorText = meta.error && meta.touched ? meta.error : '';
            return <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
        };
    const onSubmit = data => console.log('Form data ', data);

    return(
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
            <Form>
              <MyTextField placeholder="Title" name="title" type="input" sx={{width:'100%', p:1}} />
                <div>
                <FieldArray name="ingredients" sx={{width:'100%'}} >
                  {(arrayHelpers) => (
                  <div>
                    {values.ingredients.map((ingredient, index) => {
                        return (
                            <div key={index}>
                                <MyTextField placeholder="qty" name={`ingredients.${index}.qty`} />
                                <MyTextField placeholder="unit" name={`ingredients.${index}.unit`} />
                                <MyTextField placeholder="element" name={`ingredients.${index}.element`} />
                                <IconButton sx={{mt:2}} onClick={() => arrayHelpers.remove(index)}>
                                <ClearIcon />
                                </IconButton>
                            </div>
                        );
                    })}
                        <div>
                          <IconButton sx={{p:1}}
                            onClick={ () => arrayHelpers.push({ qty: '', unit: '', element: '' }) }
                          >
                            <AddCircleIcon /> add ingredients
                          </IconButton>
                        </div>
                  </div>
                  )}
                </FieldArray>
                </div>
              <MyTextField placeholder="Cooking Directions" name="instructions" type="input" as={TextField} sx={{width:'100%', p:1}} />
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

                <pre>
                    {JSON.stringify(values, null, 2)}
                    <div>
                    {JSON.stringify(errors, null, 2)}
                    </div>
                </pre>
            </Form>
            )}
          </Formik>
        </div>
    )
};