const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "timers": require.resolve('timers-browserify'),
    },
  },
  module: {
    rules: [
      // Add your rules for JavaScript/React files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add more rules for other file types (e.g., CSS, images)
    ],
  },
  // Add any additional plugins or configurations as needed
};
