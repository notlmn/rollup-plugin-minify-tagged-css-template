"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minifyTaggedCSSTemplate;

var rollup = _interopRequireWildcard(require("rollup"));

var _parser = require("@babel/parser");

var _rollupPluginTransformTaggedTemplate = require("rollup-plugin-transform-tagged-template");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function minifyPartialCSS(css) {
  // Spaces before and after these characters
  // +, -, *, / can be used in calc(), so avoid breaking them
  css = css.replace(/\s*([{}>~|=^$:!;])\s*/gm, '$1'); // Spaces only after these characters

  css = css.replace(/([",\[\]\()])\s+/gm, '$1'); // CSS comments

  css = css.replace(/\s*(\/\*|\*\/)\s*/gm, '$1'); // You only need one consequent spaces in CSS

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


function minifyTaggedCSSTemplate(options = {}) {
  const {
    tags = ['css'],
    parserOptions = {}
  } = options;
  return {
    name: 'minify-tagged-css-template',

    transform(content) {
      return (0, _rollupPluginTransformTaggedTemplate.transformTaggedContent)(content, {
        parserOptions,
        tagsToProcess: tags,
        transformer: minifyPartialCSS
      });
    }

  };
}