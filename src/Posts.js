import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'axios'

const posts = 'https://jsonplaceholder.typicode.com/posts/'

const Post = ({ id, userId, title, body }) => (
  <section key={id} className='post'>
    <h4>{title}</h4>
    <p>User: {userId}</p>
    <p>{body}</p>
  </section>
)

export const Loader = () => (
  <img className='loader' src='loader.gif' alt='Loading...' />
)

const setPosts = (post) => (prevState) => {
  const { posts } = prevState

  const newPosts = posts.concat({ ...post })

  return { posts: newPosts }
}

export default class Posts extends Component {
  async componentDidMount () {
    const { data } = await get(posts)
    
    setTimeout(() => {
      data.map((post, index) => {
        if (index < 4) {
          this.setState(setPosts(post))
        }
      })
    }, 3000)
  }

  componentDidUpdate () {
    console.log(this.state.posts)
  }
  
  render () {
    const { posts } = this['state']

    return (
      <section className='container'>
        <h2>Posts</h2>
        <Link to='/create-post' className='button button-small'>
          Create New Post
        </Link>

        <main>
          { posts.length ? posts.map(Post) : <Loader /> }
        </main>
      </section>
    )
  }

  state = { posts: [] }
}
