import React from 'react';
import { StyledComponent } from 'styled-components';
import { ParserReplacements } from './parser';
declare type ReactElement = StyledComponent<any, any> | React.FC | JSX.Element;
declare type THTMLToReactComponent = (html: string, replacements: ParserReplacements) => (ReactElement | string)[];
declare const HTMLToReactComponent: THTMLToReactComponent;
export default HTMLToReactComponent;
