import React, { useContext, useEffect } from 'react';
import { CancelToken } from 'apisauce';
import { deleteUser } from '../api/apiUser';
import { AppContext } from '../context/AppContext';

export default function useDeleteUser(activeUser) {
    let response;
    const { user } = useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source();
            const removeUser = async () =>{
                response = await deleteUser(user.token, source.token);
                if (response){
                    console.log("The user has been deleted successfully")
                }else if (response !== undefined && response === false){
                    console.log("An unexpected error occurred. Please try again")
                }
            }
            if (activeUser?.id){
                removeUser();
            };
            return ()=>{source.cancel()};
        },[activeUser]
    )
};