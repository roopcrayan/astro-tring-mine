import { AppSidebar } from '@/components/Dashboard/AppSidebar';
import NavbarAstro from '@/components/Dashboard/NavbarAstro';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AstroLayout = () => {
  const navigate = useNavigate();
  const toastShown = useRef(false);


  const { astrologer, token, loading } = useSelector((state) => state.astroAuth);

  // get role safely

  useEffect(() => {
    if (!token && !toastShown.current) {
      toastShown.current = true;
      toast.error("Please login first");
      navigate("/", { replace: true });
    }
  }, []);

  if (loading) {
    return <p className="text-center">loading...</p>;
  }

  if (!astrologer) return navigate("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <NavbarAstro />
        <div className="px-5">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default AstroLayout;
