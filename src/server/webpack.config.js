const path = require('path');
const fs = require('fs');

const config = {};

config.entry = { server: './src/server/index.js' };
config.target = 'node';

config.externals = fs.readdirSync('node_modules').reduce((externals, module) => {
  if (module === '.bin') {
    return externals;
  }

  externals[module] = `commonjs ${module}`;
  return externals;
}, {});

config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false
};

config.output = {
  path: path.join(process.cwd(), 'build'),
  filename: '[name].js'
};

config.resolve = {
  extensions: ['.js', '.json']
};

config.module = {};

config.module.loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    include: path.join(__dirname, 'src', 'server'),
    loaders: ['babel-loader']
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
];

module.exports = config;
