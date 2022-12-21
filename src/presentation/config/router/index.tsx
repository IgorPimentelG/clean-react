import React from 'react'
import { SignUp } from '@/presentation/pages/signup'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

type Props = {
  MakeLogin: React.FC
}

const Router: React.FC<Props> = ({ MakeLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<MakeLogin/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
