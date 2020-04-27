import React from 'react';
import { StyledComponent } from 'styled-components';
export interface ParserReplacements {
    [key: string]: StyledComponent<any, any> | React.FC;
}
interface Props {
    html?: string;
    replacements: ParserReplacements;
}
declare const ParserComponent: React.FC<Props>;
export default ParserComponent;
