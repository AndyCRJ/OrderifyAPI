import { useState } from 'react'

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return [isOpen, openModal, closeModal]
}
