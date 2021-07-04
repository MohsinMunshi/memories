import { AUTHENTICATION } from '../constants/actionTypes'
import * as api from'../api'

export const signin = (formData,history) => async(dispatch) => {
    try {
        const {data} = await api.signin(formData)
        dispatch({type:AUTHENTICATION,data})

        history.push('/')
    } catch (error) {
        console.log("signin Error ",error)
    }
}

export const signup = (formData,history) => async(dispatch) => {
    try {
        const {data} = await api.signup(formData)
        dispatch({type:AUTHENTICATION,data})
        
        history.push('/')
    } catch (error) {
        console.log("signup Error ",error)
    }
}