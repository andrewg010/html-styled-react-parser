"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const node_html_parser_1 = require("node-html-parser");
const HTMLToReactComponent = (html, replacements) => {
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
    if (node.hasAttribute('addstyle'))
        Component = styled_components_1.default(Component) `${node.getAttribute('addstyle')}`;
    if (!node.childNodes.length)
        return react_1.default.createElement(Component, Object.assign({}, node.attributes, { key: index }));
    return (react_1.default.createElement(Component, Object.assign({}, node.attributes, { key: index }), HTMLToReactComponent(node.innerHTML, replacements)));
};
exports.default = HTMLToReactComponent;
//# sourceMappingURL=replacer.js.map