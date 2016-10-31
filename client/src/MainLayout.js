import React, { Component } from 'react';

import logo from './logo.svg';
import './MainLayout.css';

class MainLayout extends Component {

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <img src={logo} className="MainLayout__logo" alt="logo" />
          <h2>San Dimas High School Football</h2>
        </div>

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
