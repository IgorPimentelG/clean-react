import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { MakeLogin, MakeSignUp } from '../factories/pages'
import { APIContext } from '@/presentation/context'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoutes } from '@/presentation/config'

const Router: React.FC = () => {
  return (
    <APIContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<MakeLogin/>} />
          <Route path="/signup" element={<MakeSignUp/>} />
          <Route path="/survey-list" element={<PrivateRoutes><SurveyList/></PrivateRoutes>} />
        </Routes>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export { Router }
