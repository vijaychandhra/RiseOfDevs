import React, { useEffect } from 'react'
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardMedia,
  ButtonBase,
  Grid,
  CardContent,
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'

import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'
import useStyles from './styles'

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post])

  if (!post) return null

  const openPost = (_id) => navigate(`/post/${_id}`)

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }
  if (post._id !== id) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>Created by: {post.name}</Typography>
          <Typography variant='body1'>
            {moment(post.createdAt).fromNow()}
          </Typography>

          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '10px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            You might also like:
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <Grid
            className={classes.recommendedPosts}
            container
            alignItems='stretch'
            spacing={3}
          >
            {recommendedPosts.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={2}>
                <Card className={classes.card1} raised elevation={6}>
                  <ButtonBase
                    component='span'
                    name='test'
                    className={classes.cardAction}
                    onClick={() => openPost(post._id)}
                  >
                    <CardMedia
                      className={classes.media1}
                      image={
                        post.selectedFile ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                      }
                      title={post.title}
                    />
                    <div className={classes.overlay}>
                      <Typography variant='h6'>{post.name}</Typography>
                      <Typography variant='body2'>
                        {moment(post.createdAt).fromNow()}
                      </Typography>
                    </div>

                    <div className={classes.details}>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='h2'
                      >
                        {post.tags.map((tag) => `#${tag} `)}
                      </Typography>
                    </div>
                    <div className={classes.detail}>
                      <Typography
                        className={classes.title}
                        gutterBottom
                        variant='h5'
                        component='h2'
                      >
                        {post.title}
                      </Typography>

                      <CardContent>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {post.message.split(' ').splice(0, 20).join(' ')}...
                        </Typography>
                      </CardContent>
                      <Typography
                        gutterBottom
                        variant='subtitle1'
                        className={classes.title}
                      >
                        Likes: {post.likes.length}
                      </Typography>
                    </div>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails
