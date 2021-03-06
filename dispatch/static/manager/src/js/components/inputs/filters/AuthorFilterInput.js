import React from 'react'
import { connect } from 'react-redux'

import FilterSelectInput from './FilterSelectInput'

import personsActions from '../../../actions/PersonsActions'

class AuthorFilterInputComponent extends React.Component {

  listPersons(query) {
    let queryObj = {}

    if (query) {
      queryObj['q'] = query
    }

    this.props.listPersons(this.props.token, queryObj)
  }

  convertValue(tags) {
    return typeof tags === 'undefined' ? tags : (typeof tags === 'object' ? tags.map(Number) : Number(tags))
  }

  render() {
    return (
      <FilterSelectInput
        value={this.convertValue(this.props.value)}
        many={false}
        results={this.props.persons}
        entities={this.props.entities.persons}
        update={(value) => this.props.update(value)}
        fetchResults={(query) => this.listPersons(query)}
        attribute='full_name'
        label='Author'
        icon='person'
        editMessage='Filter by author' />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.app.persons.list,
    entities: {
      persons: state.app.entities.persons
    },
    token: state.app.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listPersons: (token, query) => {
      dispatch(personsActions.list(token, query))
    }
  }
}

const AuthorFilterInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorFilterInputComponent)

export default AuthorFilterInput
