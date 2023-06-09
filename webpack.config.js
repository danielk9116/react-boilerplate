const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2,
  },
};

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  devServer: {
    port: 3000, // Port
    historyApiFallback: true,
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', CSSModuleLoader, PostCSSLoader, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
