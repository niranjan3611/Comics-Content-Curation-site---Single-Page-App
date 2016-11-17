import React, { Component } from 'react';

var SearchBar = React.createClass({
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
    );
  },

render() {
  return (
    <form className="searchForm form-horizontal">
      <input className="form-control"
        type="text"
        placeholder="Title Search..."
        value={this.props.filterText}
        ref="filterTextInput"
        onChange={this.handleChange}
      />
    </form>
    );
  }
})

export default SearchBar;
