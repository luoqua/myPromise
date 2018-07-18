// Karma configuration
// Generated on Fri Jul 13 2018 10:34:53 GMT+0800 (中国标准时间)

var webpackConfig = require('./webpack.test.conf.js')
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // 需要加载入浏览器的js文件，包括基础的类库，被测试js文件和测试用例js文件
    // 如果需要测试angular代码，比如引入angular-mock.js，给angular代码进行mock。
    // 注意angular-mock的版本一定要和angular版本一致。可在cdn网站对应的angular版本列表中寻找

    files: [
      "./test/**/*.spec.js",
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // 下面是为文件制定预处理器，也就是说测试index.js之前用webpack和sourcemap处理一下
    preprocessors: {
        'test/**/*.js': ['webpack', 'coverage'] //新增
        //coverage为覆盖率测试，这里不再介绍
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //  这里定义输出的报告
    //  html对应karma-html-reporter组件，输出测试用例执行报告
    //  coverage对应karma-coverage组件，输出测试用例执行报告
    // 下面的是用来出报告的
    reporters: ['spec', 'coverage'],
    htmlReporter: {
        outputDir:'report/ut',
        reportName:'result' //outputDir+reportName组成完整的输出报告格式，如没有定义，会自动生成浏览器+OS信息的文件夹，不方便读取报告
    },
    coverageReporter: {
          dir: './coverage',
          reporters: [
              { type: 'lcov', subdir: '.' },
              { type: 'text-summary' }
          ]
    },
    // web server port
    port: 9876,
    //下面给webpack指定相关的配置文件
    webpack: webpackConfig,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
