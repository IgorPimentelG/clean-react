import React from 'react'
import { useParams } from 'react-router-dom'
import { SurveyResult } from '@/presentation/pages'
import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult
} from '@/main/factories/usecases'

export const MakeSurveyResult: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
