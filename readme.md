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

### `parserOptions: object`

Config options to pass to the Babel parser.

> Babel Parser options may be needed depending on how your project is structured. See [Babel parser options](https://babeljs.io/docs/en/babel-parser#options) for all available options.

Example:

``` js
// rollup.js
	// ...
	plugins: [
		transformTaggedTemplate({
			parserOptions: {
				sourceType: "module", // treat files as ES6 modules
				plugins: [
					"syntax-dynamic-import", // handle dynamic imports
					[
						"decorators", // use decorators proposal plugin
						{ decoratorsBeforeExport: true }
					]
				]
			}
		})
	],
	// ...
```

## Related

- [rollup-plugin-transform-tagged-template](https://github.com/notlmn/rollup-plugin-transform-tagged-template) - Apply transformations on contents of tagged template string literals.

## License

[MIT](license) &copy; Laxman Damera
