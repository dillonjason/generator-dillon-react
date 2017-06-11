import './shims/promise.js'
import 'babel-polyfill'
import 'phantomjs-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './root'

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)
