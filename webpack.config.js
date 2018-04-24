const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const path = require('path');
const fUtils = require('f-utils');
const { dependencies, version } = require(`${__dirname}/package.json`);

module.exports = (webpackConfig, env) => {
  const production = env === 'production'
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js'

  if (production) {
    if (webpackConfig.module) {
    // ClassnameHash
      webpackConfig.module.rules.map((item) => {
        if (String(item.test) === '/\\.less$/' || String(item.test) === '/\\.css/') {
          item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]'
        }
        return item
      });
    }
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }

  if('publish' === env){
    webpackConfig.devtool = 'source-map';
    webpackConfig = {
      ...webpackConfig,
      entry:"./src/components/index.js",
      output: {
        filename: 'firebrand-base.js',
        path: path.resolve(__dirname, `dist/${version}/`),
        library: 'firebrand-base',
        libraryTarget: 'umd',
      },
      externals: fUtils.default.externals(dependencies)
    }
  }else{
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new CopyWebpackPlugin([
        {
          from: 'src/public',
          to: production ? '../' : webpackConfig.output.outputPath,
        },
      ]),
      new HtmlWebpackPlugin({
        template: `${__dirname}/src/entry.ejs`,
        filename: production ? '../index.html' : 'index.html',
        minify: production ? {
          collapseWhitespace: true,
        } : null,
        hash: true,
        headScripts: production ? null : ['/roadhog.dll.js'],
      }),
])
  }

  // webpackConfig.module.rules.map(item => {
  //   if("babel" == item.loader || String(item.test) === '/\\.less$/' || String(item.test) === '/\\.css/'){
  //     item['include'] = [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/antd/"), path.resolve(__dirname, "node_modules/firebrand-component/")];
  //   }
  // });


  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    services: `${__dirname}/src/services`,
    models: `${__dirname}/src/models`,
    public: `${__dirname}/src/public`,
    routes: `${__dirname}/src/routes`,
    themes: `${__dirname}/src/themes`,
  }

  return webpackConfig
}
