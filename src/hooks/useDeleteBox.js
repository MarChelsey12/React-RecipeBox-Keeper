import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { deleteCollection } from '../api/apiCollection'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function useDeleteBox() {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            const deleteBox=async()=>{
                response = await deleteCollection(user.token, collection.id, source.token);
                if (response){
                    setAlert({msg:`Category: ${collection.name} Deleted`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Please Reauthorize Your Account`, cat:'warning'})
                    //redirect to the login page
                    navigate('/')

                }
            }
            if(collection?.name){
                deleteBox();
            };
            return ()=>{source.cancel()}
        },[collection, setAlert, user.token, navigate]
    )
  
}