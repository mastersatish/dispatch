import React from 'react'
import { connect } from 'react-redux'

import * as userActions from '../actions/UserActions'

class App extends React.Component {

  constructor(props) {
    super(props)

    if (!this.isAuthenticated()) {
      this.props.onRequireLogin('/')
    }
  }

  isAuthenticated() {
    return !!this.props.token
  }

  render() {
    return ( <div>{this.props.children}</div> )
  }
}

const mapStateToProps = (state) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequireLogin: (nextPath) => {
      dispatch(userActions.requireLogin(nextPath))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer