import apiClientTokenAuth from './clientTokenAuth'

const endpoint = "/recipe";

//get all recipes
export const getRecipe = async (token, cancelToken)=>{
    let error;
    let recipes;

    const response = await apiClientTokenAuth(token).get(endpoint);
    if (response.ok){
        recipes=response.data.recipes
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }
    
    return{
        error,
        recipes,
    }
}

//get 1 recipe
export const getRecipeByID = async (token, id, cancelToken)=>{
    let error;
    let recipes;

    const response = await apiClientTokenAuth(token).get(endpoint+'/'+id);
    if (response.ok){
        recipes=response.data.recipes
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }
    
    return{
        error,
        recipes,
    }
}

export const postRecipe = async(token, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token).post(endpoint,data);
    return response.ok
}

export const putRecipe = async(token, data, cancelToken)=>{
    const response = await apiClientTokenAuth(token).put(endpoint,data);
    return response.ok    
}

export const deleteRecipe = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).delete(endpoint+'/'+id);
    return response.ok    
}