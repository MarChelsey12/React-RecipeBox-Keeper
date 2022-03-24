import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { postCollection } from '../api/apiCollection'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function useCreateBox(collection) {
    const {user, setAlert} =useContext(AppContext)
    const navigate = useNavigate()

    useEffect(
        ()=>{
            let response
            const source = CancelToken.source()
            const createBox=async()=>{
                response = await postCollection(user.token, collection.name, source.token);
                if (response){
                    setAlert({msg:`RecipeBox: ${collection.name} Created`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Please Reauthorize Your Account`, cat:'warning'})
                    navigate('/')
                }
            }
            if(collection?.name){
                createBox();
            };
            return ()=>{source.cancel()}
        },[collection, setAlert, user.token, navigate]
    )
  
}