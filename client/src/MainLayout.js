import React, { Component } from 'react';

import './MainLayout.css';

class MainLayout extends Component {

  render() {
    return (
      <div className="MainLayout">
        <div className="MainLayout__header">
          <h1>Webcrows learning React: Day 2</h1>
          <h3>Please do not delete more than 1 image for testing. Yet to add image add API</h3>
        </div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
