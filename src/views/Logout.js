import React, {useEffect, useContext} from 'react'
import {Navigate} from "react-router-dom"
import { AppContext } from '../context/AppContext';

export default function Logout() {
    const {setUser} = useContext(AppContext);
    useEffect(
        ()=>{
            setUser({})
            console.log('Logged out')
        },[setUser]
    )

    return (
    <>
        <Navigate to="/"/>
    </>
  )
}