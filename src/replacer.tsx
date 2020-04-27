import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { parse } from 'node-html-parser'
import { ParserReplacements } from './parser'

interface TextNode {
  tagName?: string
  nodeType: number
  text?: string
}

interface HtmlNode {
  tagName: string
  nodeType: number
  text?: string
  getAttribute: (attribute: string) => string
  hasAttribute: (attribute: string) => string
  childNodes: (HtmlNode | TextNode)[]
  attributes: {
    [key: string]: string
  }
  innerHTML: string
}

type ReactElement = StyledComponent<any, any> | React.FC | JSX.Element

type THTMLToReactComponent = (html: string, replacements: ParserReplacements) => (ReactElement | string)[]

const HTMLToReactComponent: THTMLToReactComponent = (html, replacements) => {
  const root = parse(html)
  if (!root.childNodes.length) return []
  return root.childNodes.map((node: TextNode | HtmlNode, index: number): ReactElement | string => {
    if (node.text && node.nodeType === 3) return node.text // 3 is a TextNode
    return replaceNodeWithComponent(node as HtmlNode, index, replacements)
  })
}

type TReplaceNodeWithComponent = (node: HtmlNode, index: number, replacements: ParserReplacements) => ReactElement

const replaceNodeWithComponent: TReplaceNodeWithComponent = (node, index, replacements) => {
  let Component: StyledComponent<any, any> | React.FC = replacements[node.tagName] || node.tagName as any

  if (node.hasAttribute('addstyle')) return getComponentWithAddedStyle(Component, node, index, replacements)
  return getComponentWithProps(Component, node, index, replacements)
}

const getComponentWithProps = (Component: StyledComponent<any, any> | React.FC, node: HtmlNode, index: number, replacements: ParserReplacements) => {
  if (!node.childNodes.length) return <Component suppressHydrationWarning={true} {...node.attributes} key={index} />
  return <Component suppressHydrationWarning={true} {...node.attributes} key={index}>{HTMLToReactComponent(node.innerHTML, replacements)}</Component>
}

const getComponentWithAddedStyle = (Component: StyledComponent<any, any> | React.FC, node: HtmlNode, index: number, replacements: ParserReplacements) => {
  if (typeof Component === 'object') {
    Component = styled(Component)`${node.getAttribute('addstyle')}`
    return getComponentWithProps(Component, node, index, replacements)
  } 
  const Wrapper = styled.div`${node.getAttribute('addstyle')}`
  return <Wrapper key={index}>{getComponentWithProps(Component, node, index, replacements)}</Wrapper>
}

export default HTMLToReactComponent
