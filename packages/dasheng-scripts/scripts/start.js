/*
 * File: start.js
 * Desc: 启动脚本
 * File Created: 2020-05-20 22:34:14
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
const webpack = require('webpack');
const utils = require('./utils');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const isInteractive = process.stdout.isTTY;

const compiler = webpack(
    utils.getRewriteConf().finalWebpack(require('../config/webpack.config')('development'))
);

console.log(chalk.yellow(`✈️  大圣：开始编译，请稍等...`));

compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
        clearConsole();
    }
    console.log(chalk.yellow('✍️  大圣：编译中，请稍等...'));
});

compiler.watch({ aggregateTimeout: 300 }, (err, stats) => {
    // console.log(stats);
    if (utils.handleMessage(stats)) {
        console.log(chalk.blue('✅  大圣：编译成功，请继续！'));
    }
});
