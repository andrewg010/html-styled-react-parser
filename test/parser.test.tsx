import React from 'react'
import styled from 'styled-components'
import { shallow } from 'enzyme'
import Parser from '../src'
import renderer from 'react-test-renderer'
import 'jest-enzyme'
import 'jest-styled-components'

const TestComponent = (props: any) => {
  if (props.show) return <p>Show!</p>
  return <p>Hide!</p>
} 

const replacements = {
  styled: styled.div`color: blue;`,
  component: (props: any) => <b>{props.children}</b>,
  nokids: TestComponent,
  naughty: { something: 'something' },
  string: true,
  number: 1,
  undefined: undefined,
  null: null
}

test('Renders a tag not defined in replacements as correct jsx element', () => {
  const html = '<b>hello</b>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.find('b').text()).toEqual('hello')
})

test('Renders invalid HTML tags without crashing', () => {
  const html = '<invalid>hello</invalid>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.find('invalid').text()).toEqual('hello')
})

test('Renders more complex DOM all okey and keeps children in tact', () => {
  const html = '<div><b>hello<i>you</i></b><img src="image"/></div>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual(html)
})

test('Renders a styled component correctly', () => {
  const html = '<styled>Styled component</styled>'
  const tree = renderer.create(<Parser replacements={replacements as any} html={html} />).toJSON()
  expect(tree).toHaveStyleRule('color', 'blue')
})

test('Renders a react component with children in tact', () => {
  const html = '<component><b>hello<i>you</i></b><img src="image"/></component>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual(html.replace(/component/g, 'b'))
})

test('Replaces children when component does not render them', () => {
  const html = '<nokids><b>hello<i>you</i></b><img src="image"/></nokids>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual('<p>Hide!</p>')
})

test('Passes props as expected', () => {
  const html = '<nokids show="true"><b>hello<i>you</i></b><img src="image"/></nokids>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual('<p>Show!</p>')
})

test('Renders nothing when no html passed', () => {
  const html = ''
  const wrapper = shallow(<Parser replacements={replacements as any} /> as any)
  expect(wrapper.html()).toEqual(html)
})

test('Renders nothing when invalid html passed', () => {
  const html = { invalid: 'hehe' } as any
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual('')
})

test('Deals with invalid objects in replacements by returning null', () => {
  const html = '<naughty>bad object</naughty>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual('')
})

test('Deals with invalid data type in replacements by returning null', () => {
  const html = '<string>bad object</string>'
  const wrapper = shallow(<Parser replacements={replacements as any} html={html} />)
  expect(wrapper.html()).toEqual('')
})
