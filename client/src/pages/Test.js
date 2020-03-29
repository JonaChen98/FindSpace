import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Posts from '../components/Posts';
import PostForm from '../components/Postform';

// calling the connect wrapper and the function created in the actions section
import { connect } from 'react-redux';
import { testFunc } from '../actions/testActions';

class Test extends Component {
  componentWillMount() {
    this.props.testFunc();
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.props.test}</h1>
          <PostForm />
          <hr />
          <Posts />
        </header>
      </div>
    );
  } 
}

Test.propTypes = {
  testFunc: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  test: state.test.test
});

export default connect(mapStateToProps, { testFunc })(Test);