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

export default function minifyTaggedCSSTemplate(options = {}) {
	const {
		tags = ['css'],
	} = options;

	return {
		name: 'minify-tagged-css-template',
		transform(content) {
			return transformTaggedContent(content, {
				tagsToProcess: tags,
				transformer: minifyPartialCSS
			});
		}
	};
}
