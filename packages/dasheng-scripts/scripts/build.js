/*
 * File: build.js
 * Desc: 打包
 * File Created: 2020-04-27 22:17:48
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
const fs = require('fs-extra');
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('chalk');
const paths = require('../config/paths');
const utils = require('./utils');

const compiler = webpack(
    utils.getRewriteConf().finalWebpack(require('../config/webpack.config')('production'))
);

console.log(chalk.green('开始执行打包操作...\n'));

function clearBuild() {
    fs.emptyDirSync(paths.appBuild);
}

clearBuild();

compiler.run((err, stats) => {
    if (handleMessage(stats)) {
        console.log(chalk.blue('打包成功!'));
    }
});

function handleMessage(stats) {
    const message = formatWebpackMessages(
        stats.toJson({ all: false, warnings: true, errors: true })
    );
    clearConsole();
    if (handleErrors(message)) return false;
    if (handleWarnings(message)) return false;
    return true;
}

function handleWarnings(message) {
    if (message.warnings.length) {
        console.log(chalk.yellow('打包出现以下警告提示，请注意！\n'));
        console.log(chalk.yellow(message.warnings.join('\n\n')));
        return true;
    }
    return false;
}

function handleErrors(message) {
    if (message.errors.length) {
        console.log(chalk.red('打包出现以下异常提示，请修复！\n'));
        console.log(chalk.red(message.errors.join('\n\n')));
        return true;
    }
    return false;
}

module.exports = handleMessage;
