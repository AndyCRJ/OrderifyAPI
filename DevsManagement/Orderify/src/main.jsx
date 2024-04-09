import './index.scss'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './Translation/i18n'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import ProtectRoutes from './Guard/ProtectRoutes'
import MainLayout from './Layouts/MainLayout'
import Index from './Pages/Index/Index'
import Home from './Pages/Home/Home'
import Account from './Pages/Account/Account'
import { initializeTheme } from './Services/SwitchThemeService'
import i18n from './Translation/i18n'

function App () {
  useEffect(() => initializeTheme(), []);
  
  return (
  <React.StrictMode>
    <Auth0Provider
      domain={ import.meta.env.VITE_AUTH_DOMAIN }
      clientId={ import.meta.env.VITE_AUTH_CLIENT_ID }
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH_AUDIENCE,
        redirect_uri: window.location.origin + "/app"
      }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/' element={<Index/>}/>
          </Route>
          <Route path='app' element={<ProtectRoutes/>}>
            <Route path='' element={<Home/>}/>
            <Route path='account' element={<Account/>}/>
          </Route>
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)