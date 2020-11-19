require('dotenv-flow').config();
require('ignore-styles');
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
});

require('./index');
