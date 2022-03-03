const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  outputDir: 'docs',
  pluginOptions: {
    i18n: {
      locale: 'ko-KR',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
    },
    resolve: {
      symlinks: false,
    },
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['ko', 'zh-cn'],
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/base/variables.scss";
          @import "@/assets/scss/mixins/clearfix.scss";
          @import "@/assets/scss/mixins/truncate.scss";
        `,
      },
    },
    sourceMap: true,
  },
  productionSourceMap: false,
};
