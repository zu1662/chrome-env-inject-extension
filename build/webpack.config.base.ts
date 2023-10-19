import { ChromeExtensionReloaderWebpackPlugin } from 'chrome-extension-reloader-webpack-plugin';
// import { ChromeExtensionReloaderWebpackPlugin } from './plugins/chrome-extension-reloader';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

import pkg from '../package.json';
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration & { progress?: boolean };
}

const chromeMainfestVersion = pkg.chromeExtension['mainifest-version'];

const config: Configuration = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: pathData => {
      return pathData?.chunk?.name === 'background' && chromeMainfestVersion === 3 ? '[name].js' : 'js/[name].js';
    },
    hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  stats: {
    hash: true,
    assets: false,
    modules: false,
    children: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          // 'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]-[hash:base64:6].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new ChromeExtensionReloaderWebpackPlugin({
      autoOpenDebugPages: process.env.OPEN_DEBUG_PAGES === 'true',
      manifestPath: [
        path.resolve(__dirname, '../src/manifest.v2.json'),
        path.resolve(__dirname, '../src/manifest.v3.json')
      ],
      entry: {
        background: path.resolve(
          __dirname,
          chromeMainfestVersion === 3 ? '../src/background/v3.ts' : '../src/background/v2.ts'
        ),
        popup: path.resolve(__dirname, '../src/popup/index.tsx'),
        options: path.resolve(__dirname, '../src/options/index.tsx'),
        contentScriptDirPath: path.resolve(__dirname, '../src/contents'),
        // @ts-ignore
        devtools: path.resolve(__dirname, '../src/devtools/index.tsx'),
        sandbox: path.resolve(__dirname, '../src/sandbox/index.tsx')
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            chromeMainfestVersion === 3 ? '../src/manifest.v3.json' : '../src/manifest.v2.json'
          ),
          to: path.resolve(__dirname, '../dist/manifest.json')
        },
        { from: path.resolve(__dirname, '../src/assets'), to: path.resolve(__dirname, '../dist/images') }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['popup'],
      title: 'popup page'
    }),
    new HtmlWebpackPlugin({
      sanbox: `<iframe id="theFrame" src="sandbox.html" style="display: none"></iframe>`,
      filename: 'options.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['options'],
      title: '插件配置'
    }),
    new HtmlWebpackPlugin({
      filename: 'sandbox.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['sandbox'],
      title: '沙箱配置'
    }),
    chromeMainfestVersion !== 3 &&
      new HtmlWebpackPlugin({
        filename: 'background.html',
        template: path.resolve(__dirname, '../index.html'),
        chunks: ['background'],
        title: 'background page'
      })
  ].filter(Boolean)
};

export default config;
