import React, { Component } from 'react';
import { Link } from 'react-router'

import logo from './logo.svg';

class Foo extends Component {

  componentDidMount() {
    console.log('FOO')
  }

  render() {
    return (
      <div className="Foo">
        <p>
          You are now on FOO! <Link to={`/`}>back to home</Link>
        </p>
        <div className="Foo-header">
          <img src={logo} className="Foo-logo" alt="logo" />
          <h2>Welcome to React FOO</h2>
        </div>
        <p className="Foo-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Foo;
