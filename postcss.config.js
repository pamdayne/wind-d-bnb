// postcss.config.js
module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-sorting': {
			order: [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules',
			],
			'properties-order': 'alphabetical',
			'unspecified-properties-position': 'bottom'
		}
  }
}
