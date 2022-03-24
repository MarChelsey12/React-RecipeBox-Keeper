import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { CancelToken } from 'apisauce';
import { putUser } from '../api/apiUser';
import { useNavigate } from 'react-router-dom';


export default function useEditUser(activeUser) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()
    
    useEffect(
        ()=>{
            let response;
            const source = CancelToken.source()
            const editUser = async() =>{
                response = await putUser(user.token, activeUser, source.token);
                if (response){
                    setAlert({msg:'You have successfully updated your profile', cat:'success'})
                }else if (response !== undefined && response ===false ){
                    setAlert({msg:'Please reauthorize your account', cat:'warning'})
                    navigate('/login')
                }
            }
            console.log(activeUser)
            if (activeUser?.password){
                editUser()
                navigate('/')
            };
            return ()=>{source.cancel()}
        },[activeUser, user.token, setAlert, navigate]
    )
};