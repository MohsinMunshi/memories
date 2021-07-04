import axios from 'axios'

const API = axios.create({baseURL:'https://api.spotify.com'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('Profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req
})

export const fetchPosts = (page) => {
    return API.get(`/posts?page=${page}`)
}

export const fetchPost = (id) => {
    return API.get(`/posts/${id}`)
}

export const getPostBySearch = (searchQuery) => {
    return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
}

export const createPost = (newPost) => {
    return API.post('/posts', newPost)
}

export const updatePost = (id, updatedPost) =>{
    return API.patch(`/posts/${id}`,updatedPost)
}

export const deletePost = (id) => {
    return API.delete(`/posts/${id}`)
}

export const likePost = (id) =>{
    return API.patch(`/posts/${id}/likePost`)
}

export const signin = (FormData) => {
    return API.post('/user/signin', FormData)
}

export const signup = (FormData) => {
    return API.post('/user/signup', FormData)
}