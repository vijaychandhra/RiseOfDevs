import React from 'react'
import { Container, Grow, Grid, Paper, Typography } from '@material-ui/core'
import Posts from './Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Profile = () => {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const { myPosts } = useSelector((state) => state.posts)

  const [currentId, setCurrentId] = useState(0)

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper} elevation={6}>
              <Typography variant='h6' align='center' className={classes.email}>
                {user?.result?.email}
              </Typography>
              <Typography variant='h6' align='center'>
                Total Posts:{myPosts?.length}
              </Typography>
            </Paper>

            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Profile
