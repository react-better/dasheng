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
const chalk = require('chalk');
const paths = require('../config/paths');
const utils = require('./utils');

const compiler = webpack(
    utils.getRewriteConf().finalWebpack(require('../config/webpack.config')('production'))
);

console.log(chalk.green('大圣：开始执行打包操作...\n'));

function clearBuild() {
    fs.emptyDirSync(paths.appBuild);
}

clearBuild();

compiler.run((err, stats) => {
    if (utils.handleMessage(stats)) {
        console.log(chalk.blue('大圣：打包成功！可以随时发布！'));
    }
});

