import '@/presentation/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/main/config/routes'

ReactDOM.render(
  <Router />,
  document.getElementById('main')
)
