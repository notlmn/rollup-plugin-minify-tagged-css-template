import * as rollup from 'rollup';
import {ParserOptions} from '@babel/parser';
import { transformTaggedContent } from 'rollup-plugin-transform-tagged-template';

function minifyPartialCSS(css) {
	// Spaces before and after these characters
	// +, -, *, / can be used in calc(), so avoid breaking them
	css = css.replace(/\s*([{}>~|=^$:!;])\s*/gm, '$1');

	// Spaces only after these characters
	css = css.replace(/([",\[\]\()])\s+/gm, '$1');

	// CSS comments
	css = css.replace(/\s*(\/\*|\*\/)\s*/gm, '$1');

	// You only need one consequent spaces in CSS
	css = css.replace(/\s{2,}/gm, ' ');

	return css.trim();
}

/**
 * @typedef {Object} TransformerOptions
 * @property {ParserOptions} [parserOptions={}] - Parser options for Babel
 * @property {string[]} [tags=['css']] - List of named template tags to process
 */

/**
 * @type {rollup.Plugin}
 * @param {TransformerOptions} [options={}]
 */
export default function minifyTaggedCSSTemplate(options = {}) {
	const {
		tags = ['css'],
		parserOptions = {}
	} = options;

	return {
		name: 'minify-tagged-css-template',
		transform(content) {
			return transformTaggedContent(content, {
				parserOptions,
				tagsToProcess: tags,
				transformer: minifyPartialCSS
			});
		}
	};
}
