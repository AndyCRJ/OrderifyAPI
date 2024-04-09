import React, { useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { switchTheme } from '../../Services/SwitchThemeService';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

export default function Navbar({ navbarStyle }) {

  const { t } = useTranslation()
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const changeTheme = useCallback(
    () => {
      switchTheme()
      setTheme(localStorage.getItem("theme"))
    },
    [],
  )
  
  return (
    <nav className='my-2 pt-10 fixed top-0 w-full z-10'>
      <div className='flex flex-row gap-10 px-10 py-2 justify-end items-center'>
        {
          navbarStyle == "app" ?
          <Link to="/app" className='mr-auto'>
            <Logo width="5rem"/>
          </Link> : null
        }

        {
          isLoading ? null :
          !isAuthenticated ?
          <button onClick={() => loginWithRedirect()} className='font-semibold button button-primary'>
            <i className='fas fa-right-to-bracket mr-2'></i>{t("navbar.login")}
          </button>
          :
          <>
            <Link to="/app/account" className='font-semibold button button-primary'>
              <i className='fas fa-user mr-2'></i>{t("navbar.account")}
            </Link>
            <button onClick={() => logout()} className='font-semibold button button-primary'>
              <i className='fas fa-right-from-bracket mr-2'></i>{t("navbar.logout")}
            </button>
          </>
        }

        <button className='w-10 h-10' onClick={() => changeTheme()}>
          <i className={`fas fa-${theme === "dark" ? "sun" : "moon"} text-2xl`}/>
        </button>
      </div>
    </nav>
  )
}