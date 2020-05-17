import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super() 
    this.state = {
      searchInput: ''
    }
  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(e) => this.setState({searchInput: e.target.value})} placeholder="Search Your Feed" />

          <SearchIcon onClick={() => this.props.searchPostFn(this.state.searchInput)} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}