import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { MakeLogin, MakeSignUp } from '../factories/pages'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<MakeLogin/>} />
        <Route path="/signup" element={<MakeSignUp/>} />
        <Route path="/survey-list" element={<SurveyList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
