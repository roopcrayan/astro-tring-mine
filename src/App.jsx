import { Routes, Route, Navigate } from "react-router-dom";
import UpdateUser from './components/Home/UpdateUser'
import Layout from './layout/Layout'
import Home from './pages/Home'
import FreeKundli from './pages/kundli/FreeKundli'
import ChatWithAstro from './pages/chatwithAstro/ChatWithAstro'
import CallwithAstro from './pages/callwithAstro/callwithAstro'
import AstroLogin from './components/AstroRegistration'
// import Astrodetails from './pages/AstrologerDetails'
import AstrologerDetails from './pages/AstrologerDetails'
// import BlogPage from "./pages/BlogPage";


const App = () => {
  return (
    <>

      <Routes>

        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/free-kundli' element={<FreeKundli />} />
          <Route path='/update-user' element={<UpdateUser />} />
          <Route path='/chat-with-astrologer' element={<ChatWithAstro />} />
          <Route path='/talk-to-astrologer' element={<CallwithAstro />} />
          <Route path='/astro-regiter' element={<AstroLogin />} />
          <Route path='/astro-details' element={<AstrologerDetails />} />
          {/* <Route path="/blogs" element={<BlogPage />} /> */}
          {/* <Route path="/blog/:id" element={<BlogDetails />} /> */}
        

        </Route>
      </Routes>
    </>
  )
}

export default App