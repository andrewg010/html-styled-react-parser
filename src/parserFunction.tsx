import React from 'react'
import { StyledComponent } from 'styled-components'
import { parse } from 'node-html-parser'
import { ParserReplacements } from './parserComponent'

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

type THTMLToReactComponent = (html: string, replacements: ParserReplacements) => (ReactElement | string | null)[]

const HTMLToReactComponent: THTMLToReactComponent = (html, replacements) => {
  if (typeof html !== 'string') return []
  const root = parse(html)
  if (!root.childNodes.length) return []
  return root.childNodes.map((node: TextNode | HtmlNode, index: number): ReactElement | string | null => {
    if (node.text && node.nodeType === 3) return node.text // 3 is a TextNode
    return replaceNodeWithComponent(node as HtmlNode, index, replacements)
  })
}

type TReplaceNodeWithComponent = (node: HtmlNode, index: number, replacements: ParserReplacements) => ReactElement | null

const replaceNodeWithComponent: TReplaceNodeWithComponent = (node, index, replacements) => {
  let Component: StyledComponent<any, any> | React.FC = replacements[node.tagName] || node.tagName as any

  if (/number|boolean/.test(typeof Component)) return null
  if (typeof Component === 'object' && !Object.prototype.hasOwnProperty.call(Component, '$$typeof')) return null

  return getComponentWithProps(Component, node, index, replacements)
}

const getComponentWithProps = (Component: StyledComponent<any, any> | React.FC, node: HtmlNode, index: number, replacements: ParserReplacements) => {
  if (!node.childNodes.length) return <Component suppressHydrationWarning={true} {...node.attributes} key={index} />
  return <Component suppressHydrationWarning={true} {...node.attributes} key={index}>{HTMLToReactComponent(node.innerHTML, replacements)}</Component>
}

export default HTMLToReactComponent
