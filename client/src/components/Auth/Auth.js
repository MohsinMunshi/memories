import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {signup,signin} from '../../actions/auth'
import useStyle from './style'
import Input from './Input'
import Icon from './Icon'

const initialState = {
    firstName: '',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Auth = () => {

    const classes = useStyle()
    const history = useHistory()
    const [showPassword, setshowPassword] = useState(false)
    const [isSignup, setisSignup] = useState(false)
    const [formData, setformData] = useState(initialState)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signup(formData,history))
        } else {
            dispatch(signin(formData,history))
        }
    }
    const handleChange = (e) => {
        setformData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword = () =>{
        setshowPassword((prevShowPassword)=> !prevShowPassword)
    }
    const swithMode = () =>{
        setisSignup((CurrentStatus)=> !CurrentStatus)
        setshowPassword(false)
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            
            dispatch({type:'AUTHENTICATION', data:{result,token}})
            history.push('/')

        } catch (error) {
            console.log("google login Error", error)
        }
    }
    const googleFailer = () => {
        console.log("google login failed")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input 
                                        name="firstName" 
                                        lable="Frist Name" 
                                        handleChange={handleChange} 
                                        autoFocus half
                                    />
                                    <Input 
                                        name="lastName" 
                                        lable="Last Name" 
                                        handleChange={handleChange} 
                                        half
                                    />
                                </>
                            )
                        }
                        <Input 
                            name="email" 
                            lable="Email Adddress" 
                            handleChange={handleChange} 
                            type="email"
                        />
                        <Input 
                            name="password" 
                            lable="Password" 
                            handleChange={handleChange} 
                            type={showPassword? "text":"password"}
                            handleShowPassword={handleShowPassword}

                        />
                        {
                            isSignup && (
                                <Input 
                                    name="confirmPassword" 
                                    lable="Repeat Password" 
                                    handleChange={handleChange} 
                                    type="password"
                                    handleShowPassword={handleShowPassword}
                                />
                            ) 
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        clientId="90974825976-ej52lnr1gkvh5flam700d6l2n63rdf7i.apps.googleusercontent.com"
                        render={(renderProps) => {
                             return(<Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>}
                                variant="contained"
                            > 
                                Google Sign In
                            </Button>)
                        }}
                        onSuccess={googleSuccess}
                        onFailure={googleFailer}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end" >
                        <Grid item>
                            <Button onClick={swithMode}>
                            {isSignup ? "Already Have Account? Sign in" : "Don't Have Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
