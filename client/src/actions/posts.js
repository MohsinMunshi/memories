import {FETCH_ALL,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE,LIKEPOST,START_LOADING,END_LOADING,FETCH_POST} from '../constants/actionTypes'
import * as api from'../api'

// Action Creators

export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({type:START_LOADING})
        const { data } = await api.fetchPosts(page)
        dispatch({type : FETCH_ALL, payload: data})
        dispatch({type:END_LOADING})
        
    } catch (error) {
        console.log("Error message from Action",error)
    }  
}

export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({type:START_LOADING})
        const { data } = await api.fetchPost(id)
        console.log(data)
        dispatch({type : FETCH_POST, payload: data})
        dispatch({type:END_LOADING})
        
    } catch (error) {
        console.log("Error message from Action",error)
    }  
}

export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const { data: {data} } = await api.getPostBySearch(searchQuery)
        dispatch({type : FETCH_BY_SEARCH, payload: data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log("error from Search Post", error)
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const { data } = await api.createPost(post)
        dispatch ({type:CREATE, payload:data})
        dispatch({type:END_LOADING})    
    } catch (error) {
        console.log("Error from Create Post", error)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id,post)
        dispatch({type: UPDATE, payload:data})
        dispatch(getPosts())
    } catch (error) {
        console.log("error from UpdatePost ", error )
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type:DELETE, payload:id})
        dispatch(getPosts())
    } catch (error) {
        console.log("this is error of delete", error)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({type: LIKEPOST, payload:data})
        dispatch(getPosts())        
    } catch (error) {
        console.log("this is error of Like", error)
    }
}

