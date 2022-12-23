import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

type Factory = {
  MakeLogin: React.FC
  MakeSignUp: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<factory.MakeLogin/>} />
        <Route path="/signup" element={<factory.MakeSignUp/>} />
        <Route path="/survey-list" element={<SurveyList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
