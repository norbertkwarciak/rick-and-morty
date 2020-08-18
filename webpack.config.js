'use strict';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.template.html',
  filename: './index.html'
});

const ALIAS_SYMBOL = '@';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { modules: 'commonjs' }
              ],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ico|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      },
      {
        test: /^.((?!cssmodule).)*\.(sass|scss)$/,
        use: [
          // only use the mode of development
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer, cssnano]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: 'styles/style.bundle.css'
    })
  ],
  resolve: {
    alias: {
      [ALIAS_SYMBOL]: path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};