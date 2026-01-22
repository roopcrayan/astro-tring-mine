import { AppSidebar } from '@/components/Dashboard/AppSidebar';
import NavbarAstro from '@/components/Dashboard/NavbarAstro';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { useEffect, useMemo, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AstroLayout = () => {
  const navigate = useNavigate();
  const toastShown = useRef(false);

  const { astrologer, loading } = useSelector(
    (state) => state.astroAuth
  );

  // ✅ Normalize roleId
  const roleId = useMemo(() => {
    return astrologer?.role_id
      ? Number(astrologer.role_id)
      : Number(localStorage.getItem('role_id'));
  }, [astrologer]);

  // ✅ Auth is considered checked if ANY source exists
  const isAuthChecked = Boolean(
    astrologer || localStorage.getItem('role_id')
  );

  useEffect(() => {


    if (roleId !== 2 && !toastShown.current) {
      toastShown.current = true;
      toast.error('You are not authorized to access this page');
      navigate('/', { replace: true });
    }
  }, [roleId, loading, isAuthChecked, navigate]);


  if (loading || !isAuthChecked) {
    return <p className="text-center   ">loading...</p>;
  }


  if (roleId !== 2) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <NavbarAstro />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AstroLayout;
