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
      posts: [],
      postsCopy: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind(this)
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then (res => this.setState({posts: res.data}))
    .catch(err => console.log('Data was not Imported'))

    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then (res => this.setState({postsCopy: res.data}))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => this.setState({posts: res.data}))
    .catch(err => console.log('Post did not update'))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => this.setState({posts: res.data}))
    .catch(err => console.log('post did not delete'))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {
      text: text
    })
    .then(res => this.setState({posts: res.data}))
  }

  searchPost(text){
    if (text === ''){
      this.setState({posts: this.state.postsCopy})
    }
    else {
      this.setState({posts: this.state.postsCopy.filter(e => e.text.includes(text))})
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPostFn={this.searchPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(elem => {
             return <Post text={elem.text} date={elem.date} deletePostFn={this.deletePost} updatePostFn={this.updatePost} id={elem.id} key={elem.id}/>
            })
          }
          
        </section>
      </div>
    );
  }
}

export default App;
