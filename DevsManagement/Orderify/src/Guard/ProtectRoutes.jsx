import React from 'react'
import { Navigate, Outlet, useLocation  } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import AppLayout from '../Layouts/AppLayout';
import Navbar from '../Components/Navbar/Navbar';
import Logo from '../Components/Logo/Logo';
import Loader from '../Components/Loader/Loader';

export default function ProtectRoutes({ children }) {

  const { isLoading, isAuthenticated, user } = useAuth0();
  const { pathname } = useLocation()
  
  if(isLoading) return (
    <>
      <Navbar navbarStyle="main"/>
      <div className='h-full w-full flex justify-center'>
        <Loader width="10rem"/>
      </div>
    </>
  )

  if(!isAuthenticated) return <Navigate to='/'></Navigate>
  if(!user.email_verified && pathname != "/app/account") return <Navigate to='/app/account'></Navigate>

  return (
    children ? <AppLayout> { children } </AppLayout> : <AppLayout> <Outlet/> </AppLayout>
  )
}
