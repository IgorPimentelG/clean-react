import React from 'react'
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
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
