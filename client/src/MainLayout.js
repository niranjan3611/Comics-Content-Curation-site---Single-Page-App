import React, { Component } from 'react';

import './MainLayout.css';

class MainLayout extends Component {

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <h1>Webcrows learning React</h1>
        </div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
