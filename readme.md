# rollup-plugin-minify-tagged-css-template

> Plugin to minify CSS content of [tagged template string literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), aka. template strings aka. template literals.

[![npm](https://img.shields.io/npm/v/rollup-plugin-minify-tagged-css-template)](https://www.npmjs.com/package/rollup-plugin-minify-tagged-css-template)

## Usage

``` js
// rollup.config.js
import minifyTaggedCSSTemplate from 'rollup-plugin-minify-tagged-css-template';

export default {
	input: 'test/index.js',
	plugins: [
		minifyTaggedCSSTemplate({ tags: ['css'] })
	],
	output: {
		file: 'build/index.js'
	},
};
```

> **Note**: This plugin does not use AST based minification of CSS, because the content it receives is only partial.
>
> Instead we aim to minify CSS with Regex based whitespace removal, and no optimization (deduping selectors, declaration, etc).

## API

### `tags: string[] = ['css']`

Refers to the tag names that are to be handled. Only static content of the template content is processed, any child template expressions are left unchanged. Refer to example below.

Example: `tags: ['handleCSS']` would target the following template literal.

``` js
// component.js
const decl = 'color: red;';
const result = handleCSS`
	:host {
        display: block;
        ${decl}
	}
`;

// output
const result = handleCSS`:host{display:block;${decl}}`;
```

## License

[MIT](license) &copy; Laxman Damera
