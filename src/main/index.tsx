import '@/presentation/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/config'
import { makeLogin } from './factories/pages'

ReactDOM.render(
  <Router
    MakeLogin={makeLogin}
  />,
  document.getElementById('main')
)
