# html-styled-react-parser

Convert a string of HTML to JSX with the option to replace specified elements with specific components or styled-components while maintaining child DOM structure.

The motivation behind this package was to be able to define a set of default styled components and still have these be applied to any static markup that was imported from external data sources.

Ensure that you trust the HTML before using.

## Installation

```sh
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

html (string): Your HTML
replacements (config): Your replacements object

### Configuration

Specify the replacements you want to make using the a config object in the following format:

{
  [tag name] : (React Component or Styled Component)
}

Example:
```js
{
  b: styled.b`color: blue;`
  imageofcat: () => <img src='link to cat image' alt='Pretty kitty cat'>
}
```

Any tags not included in your config object will be rendered in their standard form. For example, failure to specify an `em` key will result in any `<em>` elements being rendered as such as JSX.

### Passing props to components

All attributes in your HTML tag will be passed to the relevant JSX

Example:
`const html = '<b someprop="prop!"></b>'` results in `() => <Component someprop='prop'></Component>`

As this is a string, these props will be passed in as strings, if you want to do anything more complicated with objects you would need to handle that inside your component as required. For example using `JSON.parse()`

### Applying custom styles through your HTML

In some cases you may want to add custom styles to your component. This is possible through an addstyle attribute in the html string:

Example:
```jsx
const html = '<b addstyle="color: blue;">'
```

**important**
If you are adding custom styles to a react component rather than a styled component, your component will be wrapped in a `styled('div')` in order to make this possible. You should consider that this will have impact on any style properties applied to your outermost element in your component as this will automatically make it `display: block;`.
