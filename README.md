# html-styled-react-parser

Convert a string of HTML to JSX with the option to replace specified elements with specific components or styled-components while maintaining child DOM structure.

The motivation behind this package was to be able to define a set of default styled components and still have these be applied to any static markup that was imported from external data sources.

#### Please note

Ensure that you trust the HTML before using.<br>
This requires that you have [React](https://reactjs.org/) and [styled-components](https://styled-components.com/) installed in your project

## Installation

```bash
npm i html-styled-react-parser react styled-components

```

## Usage 

```jsx
import Parser from 'html-styled-react-parser'
import YourComponent from 'path/to/your/component'

const html = '<p>Your HTML...</p>'
const replacements = {
  p: YourComponent
}

const SomeComponent = () => (
  ...

  <Parser html={html} replacements={replacements} />

  ...
)
```

**or**

```jsx
import { parse } from 'html-styled-react-parser'
import YourComponent from 'path/to/your/component'

const html = '<p>Your HTML...</p>'
const replacements = {
  p: YourComponent
}

const SomeComponent = () => (
  ...

  {parse(html, replacements)}

  ...
)
```

### Props

`html` _*(string)*_: Your HTML<br>
`replacements` _*({})*_: Your replacements object, see below

### Configuration

Specify the replacements you want to make using the a config object in the following format:

```js
{
  [tag name] : (React Component or Styled Component)
}
```

Example:
```js
{
  b: styled.b`color: blue;`
  imageofcat: () => <img src='link to cat image' alt='Pretty kitty cat'>
}
```

Any tags not included in your config object will be rendered in their standard form. For example, failure to specify an `em` key will result in any `<em>` elements being rendered as such in JSX.

### Passing props to components

All attributes in your HTML tag will be passed to the relevant JSX

Example:
```jsx
const html = '<b someprop="prop!"></b>'
``` 
results in
```jsx
() => <Component someprop='prop'></Component>
```

As this is a string, these props will be passed in as strings, if you want to do anything more complicated with objects you would need to handle that inside your component as required. For example using `JSON.parse()`

### Importing replacements in multiple locations

You can avoid having to import replacements into every location you use the component by creating a wrapper component to pass the replacements automatically and then using that instead.

```jsx
import Parser from 'html-styled-react-parser'

const replacements = {}

const ParserWrapper = ({ html }) => <Parser html={html} replacements={replacements} />

export default ParserWrapper
```
