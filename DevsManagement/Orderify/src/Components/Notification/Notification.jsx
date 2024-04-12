import React, { createContext, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

/**
 * @typedef { Object } customNoti
 * @property { string } className - Custom classes for the notify element
 * @property { string? } iconClass - Notification icon (optional)
 */
/**
 * @typedef { "Default" | "Success" | "Warning" | "Error" | customNoti } NotiType
 */


/**
 * @typedef { Object } Notification
 * @property { NotiType } type - Notification type
 * @property { string } message - Notification message
 */

/**
 * @callback NotifyFunction
 * @param { Notification } notification
 */

/**
 * @typedef { Object } NotificationContextValue
 * @property { NotifyFunction } notify - Function to show notifications inside the app
 */

/**
 * @type { import('react').Context<NotificationContextValue> }
 */
const NotificationContext = createContext()

/**
 * @returns { NotificationContextValue }
 */
export const useNotification = () => useContext(NotificationContext)


const NOTI_TYPES = {
  "Default": {
    baseClass: "text-white dark:text-dark dark:bg-white bg-dark"
  },
  "Success": {
    baseClass: "text-dark bg-success",
    baseIconClass: "fas fa-circle-check",
  },
  "Warning": {
    baseClass: "text-dark bg-warning",
    baseIconClass: "fas fa-triangle-exclamation",
  },
  "Error": {
    baseClass: "text-dark bg-error",
    baseIconClass: "fas fa-circle-exclamation",
  }
}

const NOTI_EXPIRATION = 3500
export function NotificationProvider({ children }) {

  const [notifications, setNotifications] = useState([]);
  
  /**
   * 
   * @param {Notification} NotiProperties 
   */
  const notify = ({type, message}) => {
    const _notifications = [...notifications]
    _notifications.unshift({ key: Math.random(), type, message, iconClass: type.iconClass })
    setNotifications(_notifications)

    setTimeout(() => {
      setNotifications(prev => {
        const prevNotifications = [...prev]
        prevNotifications.pop()
        return [...prevNotifications]
      })
    }, /* 2500 */NOTI_EXPIRATION);
  }
  
  /* useEffect(() => {
    console.log(notifications)
  }, [notifications]); */

  return (
    <NotificationContext.Provider value={notify}>
      { children }
      { notifications.length > 0 && createPortal(
        <div className='absolute w-[30%] h-full p-6 top-0 right-0 flex flex-col-reverse z-[9] pointer-events-none'>
          {
            notifications.map(({key, type, message}) => {
              return (
                <Notification key={key} type={type} message={message}/>
              )
            })
          }
        </div>,
        document.body
      ) }
    </NotificationContext.Provider>
  )
}

/**
 * 
 * @param {{ type: NotiType, message: string }} 
 * @returns 
 */
export function Notification({ type, message }) {
  const [appear, setAppear] = useState(false);
  useEffect(() => { setTimeout(() => setAppear(true), 100); setTimeout(() => setAppear(false), NOTI_EXPIRATION - 150) }, []);
  return (
    <>
      {
        typeof(type) === typeof("") ?
        <div className='wrapper flex w-full'>
          <div className='w-full'>
            <div data-name="notification" className={`scapeDefault ${appear ? "appear" : null} flex justify-center items-center rounded-xl shadow-md bottom-10 ${NOTI_TYPES[type].baseClass} pointer-events-auto`}>
              {
                NOTI_TYPES[type].baseIconClass ?
                <i className={`mr-4 text-xl ${NOTI_TYPES[type].baseIconClass}`}></i> : null
              }
              <p className='mb-0 font-semibold text-md'> { message } </p>
            </div>
          </div>
        </div>
        :
        <div className='wrapper flex'>
          <div>
            <div data-name="notification" className={`scapeDefault ${appear ? "appear" : null} flex justify-center items-center rounded-xl shadow-md bottom-10 ${type.className} pointer-events-auto`}>
              {
                type.iconClass ?
                <i className={`mr-4 text-xl ${type.iconClass}`}></i> : null
              }
              <p className='mb-0 font-semibold text-md'> { message } </p>
            </div>
          </div>
        </div>
      }
    </>
  )
}