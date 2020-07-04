import minifyTaggedCSSTemplate from '../esm/index.js';

export default {
	input: 'test/index.js',
	plugins: [
		minifyTaggedCSSTemplate({
			tags: ['css']
		})
	],
	output: {
		file: 'build/index.js'
	}
};
