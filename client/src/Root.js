import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';

class RootContainer extends Component {
  constructor() {
    super();
    this.state = { message: '' }
  }

  componentDidMount() {
    var self = this;
    request
     .get('/api/example')
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         self.setState({message: res.body.message});
       }
     });
  }

  render() {
    return <Root message={this.state.message} />;
  }

}

var amazingInlineJsStyle = {
  border: '1px solid purple',
  padding: '10px',
  backgroundColor: '#ffffcc'
}

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <p>
          Message from server:
          <span style={amazingInlineJsStyle}>{this.props.message}</span>
        </p>
        <p>
          Root! <Link to={`/foo`}>a link to foo</Link>
        </p>
      </div>
    );
  }
}

Root.propTypes = {
  message: React.PropTypes.string
};

export default RootContainer;
