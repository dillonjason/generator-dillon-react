import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
<% if (!useSaga) {%>import {Api} from './util/api'<%}%>
import 'app.scss'

import {<% if (useSaga){%>fetchInitData<%} else {%>dataLoaded<%}%>} from './store/app/actions'

import Hello from './components/hello'

export class Root extends Component {
  <% if (useSaga){%>componentDidMount () {
    this.props.fetchInitData()
  }<%} else {%>async componentDidMount () {
    const mockData = await Api.getMockData()
    console.log('Returned\n', mockData)
    this.props.dataLoaded(mockData)
  }<%}%>
  render () {
    return (
      <div className='grid-container clearfix'>
        <Hello isLoaded={this.props.isLoaded} />
      </div>
    )
  }
}

Root.propTypes = {
  isLoaded: React.PropTypes.bool.isRequired,
  <% if (useSaga){%>fetchInitData<%} else {%>dataLoaded<%}%>: React.PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    isLoaded: state.app.isLoaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    <%if (useSaga) {%>fetchInitData: bindActionCreators(fetchInitData, dispatch)<%} else{%>dataLoaded: bindActionCreators(dataLoaded, dispatch)<%}%>
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Root)
