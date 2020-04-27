"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const replacer_1 = __importDefault(require("./replacer"));
const ContentParser = ({ html = '', replacements = {} }) => react_1.default.createElement(react_1.default.Fragment, null, replacer_1.default(html, replacements));
exports.default = ContentParser;
//# sourceMappingURL=parser.js.map