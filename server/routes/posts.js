import express from 'express'

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
  getMyPosts,
} from '../controllers/posts.js'

const router = express.Router()
import auth from '../middleware/auth.js'

router.get('/my', auth, getMyPosts)
router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', commentPost)
export default router
