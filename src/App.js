import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './style.css'
import Posts from './Posts'
import CreatePost from './CreatePost'


const NotFound = () => <p>404</p>

export default () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Posts}/>
      <Route exact path='/create-post' component={CreatePost}/>
      
      <Route path='*' component={NotFound}/>
    </Switch>
  </Router>
)

