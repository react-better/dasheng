/*
 * File: start.js
 * Desc: 启动脚本服务
 * File Created: 2020-05-20 22:34:14
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const paths = require('../config/paths');
const utils = require('./utils');
const WebpackDevServer = require('webpack-dev-server');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const isInteractive = process.stdout.isTTY;

const compiler = webpack(
    utils.getRewriteConf().finalWebpack(require('../config/webpack.config')('development'))
);

compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
        clearConsole();
    }
    console.log('✍️  大圣：编译中，请稍等...');
});

compiler.hooks.done.tap('done', async (stats) => {
    if (isInteractive) {
        clearConsole();
    }
});

console.log(chalk.green('☁️ 大圣：开始执行打包操作...\n'));

function clearBuild() {
    fs.emptyDirSync(paths.appBuild);
}

clearBuild();

const devServer = new WebpackDevServer(compiler, {
    clientLogLevel: 'none',
    publicPath: '/build/',
    stats: {
        // copied from `'minimal'`
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        // our additional options
        moduleTrace: true,
        errorDetails: true,
        colors: true,
    },
});

devServer.listen(8080, '0.0.0.0', (err) => {
    if (isInteractive) {
        clearConsole();
    }
});

[('SIGINT', 'SIGTERM')].forEach(function (sig) {
    process.on(sig, function () {
        devServer.close();
        process.exit();
    });
});
