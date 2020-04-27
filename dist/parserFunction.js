"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const node_html_parser_1 = require("node-html-parser");
const HTMLToReactComponent = (html, replacements) => {
    if (typeof html !== 'string')
        return [];
    const root = node_html_parser_1.parse(html);
    if (!root.childNodes.length)
        return [];
    return root.childNodes.map((node, index) => {
        if (node.text && node.nodeType === 3)
            return node.text;
        return replaceNodeWithComponent(node, index, replacements);
    });
};
const replaceNodeWithComponent = (node, index, replacements) => {
    let Component = replacements[node.tagName] || node.tagName;
    if (/number|boolean/.test(typeof Component))
        return null;
    if (typeof Component === 'object' && !Object.prototype.hasOwnProperty.call(Component, '$$typeof'))
        return null;
    return getComponentWithProps(Component, node, index, replacements);
};
const getComponentWithProps = (Component, node, index, replacements) => {
    if (!node.childNodes.length)
        return react_1.default.createElement(Component, Object.assign({ suppressHydrationWarning: true }, node.attributes, { key: index }));
    return react_1.default.createElement(Component, Object.assign({ suppressHydrationWarning: true }, node.attributes, { key: index }), HTMLToReactComponent(node.innerHTML, replacements));
};
exports.default = HTMLToReactComponent;
//# sourceMappingURL=parserFunction.js.map