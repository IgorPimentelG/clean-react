import '@/presentation/styles/global.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/config'
import { makeLogin, makeSignUp } from './factories/pages'

ReactDOM.render(
  <Router
    MakeLogin={makeLogin}
    MakeSignUp={makeSignUp}
  />,
  document.getElementById('main')
)
