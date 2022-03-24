import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { postUser } from '../api/apiUser'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function useCreateUser(newuser) {   
    let response
    const {setAlert} =useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const createUser=async()=>{
                response = await postUser(newuser.username, newuser.email, newuser.password, source.token);
                if (response){
                    setAlert({msg:`The user ${newuser.username} has been Created`, cat:'success'})
                    navigate('/login')
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`There was an error creating the user`, cat:'warning'})
                    navigate('/register')
                }else{
                    throw new Error('I am not a teapot!')
                }
            }
            if(newuser?.email){
                createUser();
            };
            return ()=>{source.cancel()}
        },[newuser, navigate]
    )
  
}