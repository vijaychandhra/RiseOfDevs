import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import PostDetails from './components/PostDetails/PostDetails'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Profile from './components/Profile/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/post' />} />
          <Route path='/post' element={<Home />} />
          <Route path='/post/search' element={<Home />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
