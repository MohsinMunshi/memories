import express from 'express'
import {getPost,getPostById,getPostBySearch,createPost,updatePost,deletePost,likePost} from '../controllers/post.js'
import auth from '../middlewear/auth.js'

const router = express.Router()

router.get('/', getPost)
router.get('/search',getPostBySearch)
router.get('/:id', getPostById)

router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router