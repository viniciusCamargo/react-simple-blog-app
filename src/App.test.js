import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

const wrapper = shallow(<App />)

it('renders welcome message', () => {
  const welcome = <h2>Welcome to React</h2>
  expect(wrapper.contains(welcome)).toBe(true)
})
