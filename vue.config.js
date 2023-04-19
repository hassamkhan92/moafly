/*
 * @Author: wangchaoxu
 * @Date: 2020-05-12 17:17:38
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-12-21 21:59:38
 * @Description: vue配置文件
 */
'use strict';
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip压缩
const TerserPlugin = require('terser-webpack-plugin'); // 实际上webpack已经安装过了
const productionGzipExtensions = ['js', 'css', 'json', 'txt'];
const env = process.env.NODE_ENV;
// 引入
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js'
  ]
};
module.exports = {
  publicPath: env === 'production' ? './' : '/',
  productionSourceMap: env === 'development',
  assetsDir: './', //静态资源目录名称
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    open: false,
    hot: true,
    liveReload: true,
    https: {
      // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
      cert: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.crt')),
      key: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.key'))
    },
    port: 4321,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL, // 目标接口域名
        changeOrigin: true, // 是否跨域
        logLevel: 'debug'
        // pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' } // 把/app 替换成 /
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['./src/assets/styles/variables.less', './src/assets/styles/mixin.less', './src/assets/styles/common.less']
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  configureWebpack: config => {
    config.devtool = '#eval-source-map';
    // 忽略打包配置
    if (env === 'production') {
      config.externals = assetsCDN.externals;
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8
        }),
        new TerserPlugin({
          extractComments: true,
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            extractComments: 'all',
            compress: {
              drop_console: true,
              pure_funcs: ['console.log']
            }
          }
        })
      );
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all', //async异步代码分割 initial同步代码分割 all同步异步分割都开启
          minSize: 30000, //字节 引入的文件大于30kb才进行分割
          //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
          minChunks: 1, //模块至少使用次数
          maxAsyncRequests: 5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
          maxInitialRequests: 3, //首页加载的时候引入的文件最多3个
          automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              }
            }
          }
        }
      };
    }
  },
  // 展示图形化信息
  chainWebpack: config => {
    if (env === 'production') {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  }
  //   transpileDependencies: ['quasar']
};
