import { Transition } from '@headlessui/react'
import React, { Fragment, useRef, useState } from 'react'

export default function Tooltip({ content, children }) {

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      <Transition
        appear
        as={Fragment}
        show={showTooltip}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div ref={tooltipRef} className="scapeDefault absolute z-10 -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-dark dark:text-white bg-white dark:bg-dark text-sm px-4 py-2 rounded-md">
              <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -top-2 left-1/2 -translate-x-1/2"></div>
              {content}
            </div>
          )}
        </Transition.Child>
      </Transition>
    </div>
  )
}
