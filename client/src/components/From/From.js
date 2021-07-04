import React, { useState, useEffect}from 'react'
import makeStyles from './style'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch,useSelector } from 'react-redux'
import { createPost,updatePost } from '../../actions/posts'
import {useHistory} from 'react-router-dom'


const From = ({currentID,setcurrentID}) => {
     const history = useHistory()
    const [postData, setpostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    console.log(postData)

    const post = useSelector((state) => currentID? state.posts.posts.find((p) => p._id === currentID) : null)
    
    const classes = makeStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('Profile'))
    useEffect(() => {
        if(post) setpostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentID){
            dispatch(updatePost(currentID,{...postData, name: user?.result?.name }))
        }
        else{
            dispatch(createPost({...postData, name: user?.result?.name } , history))
        }
        clear()
        
    }

    const clear = () => { 
        setcurrentID(null)
        setpostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                 <Typography variant="h6" align="center">
                    Please Signin to create your memories and like other's memories
                 </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation="6">
            <form container alignItems="stretch" autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentID? 'Editing' : 'Creating'} Memory 
                </Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    id="standard-basic"
                    label="Title" 
                    fullWidth
                    required
                    value={postData.title}
                    onChange={(e)=>{
                        setpostData({...postData, title: e.target.value})
                    }}
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    id="standard-basic"
                    label="Message" 
                    fullWidth
                    required
                    value={postData.message}
                    onChange={(e)=>{
                        setpostData({...postData, message: e.target.value})
                    }}
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    id="standard-basic"
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(e)=>{
                        setpostData({...postData, tags: e.target.value.split(',')})
                    }}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        required
                        multiple={false}
                        onDone={(base64) => {
                            setpostData({...postData, selectedFile: base64})
                        }}
                    />
                </div>
                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth 
                >
                    Submit
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear}
                    fullWidth 
                >
                    clear 
                </Button>
            </form>
        </Paper>
    )
}

export default From
