
module.exports = {
  plugins: {
    'postcss-easy-import': {},
    'postcss-normalize': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true,      
      },
      importFrom: [
        './styles/tokens.css'
      ]
    },
    'postcss-custom-selectors': {},
  },
}
