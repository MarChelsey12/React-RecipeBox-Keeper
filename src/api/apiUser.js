import apiClientNoAuth from './clientNoAuth'
import apiClientTokenAuth from './clientTokenAuth'

const endpoint = "/user";

export const postUser = async (username, email, password, cancelToken)=>{
    let error;
    let user;

    const response = await apiClientNoAuth(cancelToken).post(endpoint,{username:username,email:email,password:password});
    if(response.ok){
        user=response.data
    }else{
        error="Unprocessable entity due to semantic errors."
    }
    return{
        error,
        user,
    }
}

export const putUser = async(token, data, cancelToken)=>{
    let error;
    let user;
    
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint,data);
    if(response.ok){
        user=response.data
    }else{
        error="Unexpected error."
    }
    return{
        error,
        user,
    }
}

export const deleteUser = async(token, cancelToken)=>{
    let error;
    let user;

    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint);
    if(response.ok){
        user=response.data
    }else{
        error="Unexpected error."
    }
    return{
        error,
        user,
    }
}