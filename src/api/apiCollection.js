import apiClientTokenAuth from './clientTokenAuth'

const endpoint = "/collection";

//get all collections
export const getCollection = async (token, cancelToken)=>{
    let error;
    let collections;

    const response = await apiClientTokenAuth(token).get(endpoint);
    if (response.ok){
        collections=response.data.collections
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }
    
    return{
        error,
        collections,
    }
}

export const postCollection = async(token, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token).post(endpoint,data);
    return response.ok
}

export const putCollection = async(token, id, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token).put(endpoint+'/'+id, data);
    return response.ok    
}

export const deleteCollection = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).delete(endpoint+'/'+id);
    return response.ok    
}
