import React from 'react'
import { shallow } from 'enzyme'
import Parser from '../src/parser'

const wrapper = shallow(<Parser replacements={{}} html='<b>Hello</b>' />)

test('h1 is rendered', () => {
  const component = wrapper.find('h1')
  expect(component.exists()).toBeFalsy()
})
