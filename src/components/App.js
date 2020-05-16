import React, { Component } from 'react';
import axios from 'axios'

import './App.css';
import Post from './Post/Post'

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then (res => this.setState({posts: res.data}))
    .catch(err => console.log('Data was not Imported'))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => this.setState({posts: res.data}))
    .catch(err => console.log('Post did not update'))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {posts.map(elem => {
             return <Post text={elem.text} date={elem.date} updatePostFn={this.updatePost} id={elem.id} key={elem.id}/>
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
