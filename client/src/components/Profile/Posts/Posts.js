import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import Post from '../../Posts/Post/Post'
import useStyles from './styles'
import { useEffect } from 'react'
import { getMyPosts } from '../../../actions/posts'

const Posts = ({ setCurrentId }) => {
  const { myPosts, isLoading } = useSelector((state) => state.posts)
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyPosts())
  }, [dispatch])

  if (!myPosts?.length && !isLoading) return 'No posts'

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {myPosts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
