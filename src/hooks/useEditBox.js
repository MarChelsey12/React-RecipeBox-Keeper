import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { putCollection } from '../api/apiCollection'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function useEditBox( collection ) {
    const {user, setAlert} =useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            const editBox=async()=>{
                response = await putCollection(user.token, collection.id, source.token);
                if (response){
                    setAlert({msg:`Collection: ${collection.name} Edited`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Please Reauthorize Your Account`, cat:'warning'})
                    ///redirect to the login page
                    navigate('/')

                }
            }
            if(collection?.name){
                editBox();
            };
            return ()=>{source.cancel()}
        },[collection, setAlert,user.token, navigate]
    )

}