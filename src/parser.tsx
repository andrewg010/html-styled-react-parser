import React from 'react'
import { StyledComponent } from 'styled-components'
import HTMLToReactComponent from './replacer'

export interface ParserReplacements {
  [key: string]: StyledComponent<any, any> | React.FC
}

interface Props {
  html?: string
  replacements: ParserReplacements
}

const ContentParser: React.FC<Props> = ({ html = '', replacements = {} }) => <>{HTMLToReactComponent(html, replacements)}</>

export default ContentParser
