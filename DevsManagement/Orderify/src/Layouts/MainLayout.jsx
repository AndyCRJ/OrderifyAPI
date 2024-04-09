import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

export default function MainLayout({children}) {
  
  return (
    <>
      <Navbar navbarStyle="main"/>
      <main className='flex flex-col h-full'>
        { children ? children : <Outlet/> }
      </main>
    </>
  )
}
