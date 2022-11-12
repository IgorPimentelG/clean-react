import React from 'react'
import { Login } from '@/presentation/pages'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
