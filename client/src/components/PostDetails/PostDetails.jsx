import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress , Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import {getPost, getPostBySearch} from '../../actions/posts'
import useStyles from './style'

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    console.log(isLoading)
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const { email } = useParams()
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        dispatch(getPostBySearch({search: "none", tags: post?.tags.join(',')}))
    }, [post])

    const openPost = (_id) => history.push(`/posts/${_id}`);
    
    if(!post) return null

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)
    
    if(isLoading){
        return(
            <Paper elevation="6" className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h4" component="h2" >{post.title}</Typography>
                <Typography gutterBottom variant="h6" style={{fontSize:"Large"}} color="textSecondary" component="h3">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" style={{fontSize:"meidum"}}component="p">{post.message}</Typography>
                <Typography style={{fontSize:"small"}} variant="body1">Created by: {post.name}</Typography>
                <Typography style={{fontSize:"small"}} variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />    
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile.base64 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
            <Divider style={{ margin: '20px 0' }} />
        </div>
        {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom style={{overFlow:"auto"}} variant="subtitle2">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile.base64} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
        </Paper>
    )
}

export default PostDetails
