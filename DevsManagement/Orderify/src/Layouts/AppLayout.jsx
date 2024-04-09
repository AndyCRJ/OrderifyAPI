import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

export default function AppLayout({children}) {
  
  return (
    <>
      <Navbar navbarStyle="app"/>
      <main className='flex flex-col h-full'>
        <div className='h-full overflow-x-hidden [overflow-y:overlay] mt-[8rem]'>
          { children ? children : <Outlet/>}
        </div>
      </main>
    </>
  )
}
