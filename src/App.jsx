import React from 'react'
import { Button } from './components/ui/button'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import FreeKundli from './pages/kundli/FreeKundli'
import UpdateUser from './components/Home/UpdateUser'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/free-kundli' element={<FreeKundli />} />
          <Route path='/update-user' element={<UpdateUser />} />
        </Route>
      </Routes>
    </>
  )
}

export default App