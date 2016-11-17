import React, { Component } from 'react';

import './MainLayout.css';

class MainLayout extends Component {

  render() {
    return (
      <div className="MainLayout">
      <div className="jbanner jumbotron container-fluid"></div>
        <main className="main-class">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
