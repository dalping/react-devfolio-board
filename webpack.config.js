const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const dotenv = require('dotenv');

dotenv.config();
// s3 api key와 버킷 이름 세팅
const apiKey = process.env.API_KEY || '';
const bucket = process.env.BUCKET || '';
const port = process.env.port || 3000;

const RESOLVE = {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src/'),
  },
  fallback: {
    util: require.resolve('util/'),
  },
};

const ENTRY = './index.js';
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const DEV_PUBLIC_PATH = '/';
const PRODUCT_PUBLIC_PATH = '/build/';

module.exports = (_, argv) => {
  const publicPath =
    argv.mode === PRODUCTION ? PRODUCT_PUBLIC_PATH : DEV_PUBLIC_PATH;
  const nodeEnv = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;
  const plugins =
    argv.mode === PRODUCTION
      ? ['@babel/plugin-transform-runtime']
      : ['@babel/plugin-transform-runtime', 'react-refresh/babel'];
  const mode = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;

  return {
    entry: ENTRY,
    resolve: RESOLVE,
    mode,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins,
          },
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          exclude: [
            /\.(js|jsx|mjs)$/,
            /\.html$/,
            /\.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
          ],
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[hash].[ext]',
                limit: 1000,
                publicPath: `${publicPath}images`,
                outputPath: '/images',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/],
          use: ['css-loader'],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
                attributes: {
                  'data-cke': true,
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          ],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          use: ['raw-loader'],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: `./public/static/favicon.png`,
      }),
      new CleanWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        API_KEY: JSON.stringify(apiKey),
        BUCKET: JSON.stringify(bucket),
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
      new UglifyJSPlugin(),
    ],

    output: {
      filename: '[name].[hash].js',
      clean: true,
      path: path.join(__dirname, '/build'),
      publicPath,
    },

    devServer: {
      port,
      hot: true,
      open: true,
      historyApiFallback: true,
      devMiddleware: {
        publicPath,
      },
    },
    // devtool: 'eval-cheap-module-source-map',
  };
};
