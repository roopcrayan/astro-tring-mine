import { Routes, Route, Navigate } from "react-router-dom";
import UpdateUser from './components/Home/UpdateUser'
import Layout from './layout/Layout'
import Home from './pages/Home'
import FreeKundli from './pages/kundli/FreeKundli'

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