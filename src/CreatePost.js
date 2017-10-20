import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { post } from 'axios'

import { Loader } from './Posts'

const Message = ({ children }) => (
  <p className='message'>
    {children}
  </p>
)

const placeholders = {
  text: '123',
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  body: 'Integer at vulputate augue, in efficitur ligula. Etiam hendrerit eu ante eu sollicitudin. Curabitur ornare mi ac elit dictum molestie. Proin lobortis fringilla neque, ut convallis nunc dapibus quis. Cras non ornare enim. Proin rutrum efficitur eros. Vivamus bibendum aliquet arcu quis consectetur. Donec vel sem in tortor pulvinar lobortis. Maecenas bibendum, sapien id aliquet elementum, leo nisl semper ligula, ut tristique risus magna sit amet nisi. Integer vehicula lacus eget lacinia mollis.'
}

const posts = 'https://jsonplaceholder.typicode.com/posts/'

const initialState = {
  requestMessage: '',
  validationIssue: false,
  loading: false,
  userId: '',
  title: '',
  body: ''
}

export default class CreatePost extends Component {
  handleInput = (event) => {
    const { id, value } = event['target']

    this.setState({ [id]: value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    
    const { userId, title, body } = this['state']
    
    if (!userId || !title || !body) {
      return this.setState({ validationIssue: true })
    }    
    
    this.setState({ loading: true })

    const { status } = await post(posts, { userId, title, body })

    if (status === 201) {
      const requestMessage = 'Thank you! The post was created successfully.'

      return this.setState({ requestMessage, loader: false })
    }

    const requestMessage = 'Sorry, the post was not created. Please, try again later.'
    
    this.setState({ requestMessage, loader: false })
  }

  componentDidUpdate () {
    console.log(this.state)
  }
  
  render () {
    const { requestMessage, validationIssue, loading, userId, title, body } = this['state']

    return (
      <section className='container'>

        <h2>Create Post</h2>

        <Link to='/' className='button button-small'>
          List Posts
        </Link>

        { requestMessage ? (
          <Message>
            {requestMessage}
          </Message>
        ) : loading ? (
          <Loader />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <fieldset>

              { validationIssue ? (
                <Message>Sorry, all fields are required. Please, try again.</Message>
              ) : null }

              <label htmlFor='userId'>User ID</label>

              <input
                onChange={this.handleInput}
                value={userId}
                type='text'
                placeholder={placeholders['text']}
                id='userId' />

              <label htmlFor='title'>User ID</label>

              <input
                onChange={this.handleInput}
                value={title}
                type='text'
                placeholder={placeholders['title']}
                id='title' />

              <label htmlFor='body'>Body</label>

              <textarea
                onChange={this.handleInput}
                value={body}
                placeholder={placeholders['body']}
                id='body' />

              <input
                className='button-primary button-small'
                type='submit'
                value='Send' />
            </fieldset>
          </form>
        ) }

      </section>
    )
  }

  state = initialState
}
