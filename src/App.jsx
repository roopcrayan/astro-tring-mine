import { Route, Routes, useLocation } from "react-router-dom";
import Layout from './layout/Layout';

// import Astrodetails from './pages/AstrologerDetails'
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

import AstroLayout from "./layout/AstroLayout";
import { GetAllAstrologer } from "./redux/slice/AstroAuth";
 
// import BlogPage from "./pages/BlogPage";

const Home = lazy(() => import("./pages/Home"));
const FreeKundli = lazy(() => import("./pages/kundli/FreeKundli"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetails = lazy(() => import("./pages/Blog/BlogDetails"));
const ChatWithAstro = lazy(() => import("./pages/chatwithAstro/ChatWithAstro"));
const CallwithAstro = lazy(() => import("./pages/callwithAstro/callwithAstro"));
const AstrologerDetails = lazy(() => import("./pages/AstrologerDetails"));
const AstroLogin = lazy(() => import("./components/AstroLogin"));
const AstroRegister = lazy(() => import("./components/AstroRegistration"));
const HoroscopeDetails = lazy(() => import("./components/Horoscopes/HoroscopeDetails"));
const Horoscopes = lazy(() => import("./pages/Horoscopes"));
const Dashboard = lazy(() => import("./pages/AstroDashboard/Dashboard"));
const UpdateAstro = lazy(() => import("./pages/AstroDashboard/UpdateAstro"));
const UpdateUser = lazy(() => import("./components/Home/UpdateUser"));




const App = () => {

  const path = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const fatchAstrologers = async () => {
    await dispatch(GetAllAstrologer()).unwrap();
  }


  useEffect(() => {
    fatchAstrologers();
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/free-kundli' element={<FreeKundli />} />
            <Route path='/update-user' element={<UpdateUser />} />
            {/* <Route path='/chat-with-astrologer' element={<ChatWithAstro />} /> */}
            <Route path='/talk-to-astrologer' element={<CallwithAstro />} />
            <Route path='/horoscopes/:date' element={<Horoscopes />} />
            <Route path='/horoscopes/:time/:horos' element={<HoroscopeDetails />} />
            <Route path='/astro-login' element={<AstroLogin />} />
            <Route path='/astro-register' element={<AstroRegister />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Route>



          <Route path="/astro" element={<AstroLayout />}>
            <Route path="/astro/dashboard" element={<Dashboard />} />
            <Route path="/astro/update-astro" element={<UpdateAstro />} />
          </Route>



        </Routes>
      </Suspense>
    </>
  )
}

export default App