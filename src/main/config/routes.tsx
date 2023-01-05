import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoutes } from '@/presentation/config'
import { RecoilRoot } from 'recoil'
import {
  MakeLogin,
  MakeSignUp,
  MakeSurveyList,
  MakeSurveyResult
} from '@/main/factories/pages'
import { currentAccountState } from '@/presentation/shared/atoms'

const Router: React.FC = () => {
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, {
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    })}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<MakeLogin/>} />
          <Route path="/signup" element={<MakeSignUp/>} />
          <Route path="/survey-list" element={<PrivateRoutes><MakeSurveyList/></PrivateRoutes>} />
          <Route path="/survey/:id" element={<PrivateRoutes><MakeSurveyResult/></PrivateRoutes>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export { Router }
