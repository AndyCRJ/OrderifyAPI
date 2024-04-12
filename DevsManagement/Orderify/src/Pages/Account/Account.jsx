import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import Logo from '../../Components/Logo/Logo';
import { useTranslation } from 'react-i18next';

export default function Account() {
  
  const { user } = useAuth0()
  const { t } = useTranslation()
  const [loggedInAs, setLoggedInAs] = useState("");

  useEffect(() => {
    setLoggedInAs(user.sub.split("|")[0]);
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
      <div className='text-center mb-4'>
        <p className='text-3xl font-semibold'>{t("account.accountInfo")}</p>
      </div>
      <div className='flex flex-col gap-4 w-[35%] p-5 border-solid dark:border-white border-dark border-4 rounded-2xl'>

        <div className='flex justify-center mb-4'>
          <img className='rounded-2xl w-[6.25rem]' src={user.picture} alt={user.name} />
        </div>

        {
          user.nickname ?
          <div className='flex flex-col gap-1 w-fit text-lg'>
            <div className='flex items-center'>
              <i className='fas fa-signature mr-2'></i>
              <p>{user.name}</p>
            </div>
            <div className='w-full h-1 bg-dark dark:bg-white rounded-full'></div>
          </div> : null
        }

        <div className='flex flex-col gap-1 w-fit text-lg'>
          <div className='flex items-center'>
            <i className='fas fa-envelope mr-2'></i>
            <p>{user.email}</p>
          </div>
          <div className='w-full h-1 bg-dark dark:bg-white rounded-full'></div>
        </div>

        <div className='flex flex-col gap-1 w-fit text-lg'>
          <div className='flex items-center'>
            <i className='fas fa-user-check mr-2'></i>
            <p>{user.email_verified ? t("account.verified") : t("account.notVerified")}</p>
          </div>
          <div className='w-full h-1 bg-dark dark:bg-white rounded-full'></div>
        </div>

        {
          !user.email_verified ?
          <div className='flex relative justify-center items-center py-3 px-11 text-center'>
            <div className='flex absolute left-3 items-center justify-center w-fit text-2xl'>
              <i className='fas fa-warning'></i>
            </div>
            <p>{t("account.verifyAccountMessage")}</p>
          </div>
          : null
        }

        <div className='w-full flex flex-col gap-2 mt-5 justify-center items-center'>
          <p className='font-bold'>{t("account.loggedIn")}</p>
          <div className='flex items-center justify-center w-fit text-2xl p-2 border-dark dark:border-white rounded-xl border-solid border-4'>
            {
              loggedInAs == "google-oauth2" ? <i className='fab fa-google'></i>
              :
              loggedInAs == "windowslive" ? <i className='fab fa-microsoft'></i>
              :
              <Logo width="1.5rem"/>
            }
          </div>
        </div>

      </div>
    </div>
  )
}
