import React from 'react'
import Loader from '../Loader/Loader'

/**
 * 
 * @param {{ children: import('react').ReactElement, className: string, autoComplete: "off" | undefined, onSubmit: Function }} 
 * @returns 
 */
const Form = ({ children, className, autoComplete, onSubmit }) => {
  
  return (
    <form autoComplete={autoComplete} onSubmit={onSubmit} className={`flex flex-col ${className} items-center justify-center`}>
      {children}
    </form>
  )
}

/**
 * 
 * @param {{ children: import('react').ReactElement, className: string, onCloseForm: Function }} 
 * @returns 
 */
Form.Header = ({ children, className }) => {
  return (
    <div className={`flex w-full relative items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

Form.Body = ({ children, className }) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {children}
    </div>
  )
}

/**
 * 
 * @param {{ children: import('react').ReactElement, className: string, formikFieldProps: any, touched: boolean, error: string | undefined, fieldInfo: { label: string, name: string, id: string, className: string, required: boolean, autoComplete: 'off' | undefined, formElement: "input" | "select" | "textArea" } }} 
 * @returns 
 */
Form.Field = ( { className, formikFieldProps, touched, error, fieldInfo } ) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className='flex items-center text-lg'>
        <label htmlFor='name' className=''>{fieldInfo.label}</label>
        {
          fieldInfo.required ?
            <i className='fas fa-asterisk ml-1 text-xs'></i>
          : null
        }
      </div>

      <div>
        {
          touched && error ?
          <p className={`text-sm${error ? ' text-error' : ''}`}>
            {error}
          </p> : null
        }
      </div>

      {
        fieldInfo.formElement == "input" ?
          <input
            autoComplete={fieldInfo.autoComplete}
            id={fieldInfo.id}
            name={fieldInfo.name}
            className={`input scapeDefault${error ? ' input-error' : ''} ${fieldInfo.className}`}
            type='text'
            {...formikFieldProps}
          />
        : fieldInfo.formElement == "select" ? 
          <>
          </>
        : fieldInfo.formElement == "textArea" ?
          <>
          </>
        : null
      }

    </div>
  )
}

/**
 * 
 * @param {{ submitButtonText: string, buttonStyleClass: string, iconClass?: string, formLoading: boolean }} 
 */
Form.Footer = ({ submitButtonText, buttonStyleClass, iconClass, formLoading }) => {
  return (
    <div className="flex relative w-full mt-4 items-center justify-center">
      <button type="submit" className={`button ${buttonStyleClass} font-semibold`}>
        {
          iconClass ?
            <i className={iconClass}></i>
          : null
        }
        {submitButtonText}
      </button>
      {
        formLoading ?
        <div className='absolute right-4'>
          <Loader width="3rem"/>
        </div> : null
      }
    </div>
  )
}

export default Form

