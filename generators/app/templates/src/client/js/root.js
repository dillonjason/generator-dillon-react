import React, { Component } from 'react'

import 'app.scss'

import Hello from './components/hello'

export default class Root extends Component {
  render () {
    return (
      <div className='grid-container clearfix'>
        <Hello isLoaded />
      </div>
    )
  }
}
