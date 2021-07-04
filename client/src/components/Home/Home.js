import React, {useState,useEffect} from 'react'
import {Container,Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core' 
import { useDispatch } from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts'
import From from '../From/From'
import { getPosts, getPostBySearch } from '../../actions/posts'
import Paginate from '../Pagination'
import useStyles from './Style'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentID, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){
            searchPost()
        }
    }
    
    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) =>{
        setTags(tags.filter((tag)=> tag !== tagToDelete))
    }

    const searchPost = () => {
        if(search.trim() || tags){
             dispatch(getPostBySearch({search,tags: tags.join(",")}))
             history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }
  
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories" 
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e)=> setSearch(e.target.value)}
                            />
                            <ChipInput 
                                style={{margin:'10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Task"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" > Search </Button>
                        </AppBar>
                        <From currentID={currentID} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Paginate page={page}/>
                            </Paper>
                        )}                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
