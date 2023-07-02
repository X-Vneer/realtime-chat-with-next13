'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {}

const ToasterProvider = (props: Props) => {
  return (
    <Toaster position='top-right' reverseOrder={false} />
  )
}

export default ToasterProvider