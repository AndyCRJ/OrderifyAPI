import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../Components/Logo/Logo';
import { useTranslation } from 'react-i18next';

export default function Index() {
  
  const { t } = useTranslation()

  return (
    <div className='w-full h-full flex flex-col justify-center items-center relative'>
      <Logo width="25rem"/>
      <p className='nunito text-2xl font-bold [letter-spacing:1rem] mt-8'>ORDERIFY</p>
      <div className='flex flex-col justify-center items-center px-[25%]'>
        <p className='text-lg font-medium mt-8 text-center'>{t('index.OrderifyInfo1')}</p>
        <p className='text-lg font-medium mt-2 text-center'>{t('index.OrderifyInfo2')}</p>
        <div className='mt-4 dark:bg-white bg-black w-[80%] h-1 rounded-full'></div>
      </div>
      <div className='absolute font-semibold flex gap-10 bottom-0 items-center justify-center mb-3'>
        <p><i className='fas fa-copyright'></i> Orderify</p>
        <p>{t("index.AllRightsReserved")}</p>
      </div>
    </div>
  )
}
