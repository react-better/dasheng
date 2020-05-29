/*
 * File: start.js
 * Desc: 启动脚本
 * File Created: 2020-05-20 22:34:14
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
const webpack = require('webpack');
const handleMessage = require('./build');
const utils = require('./utils');
const chalk = require('chalk');

process.env.NODE_ENV = 'development';

const compiler = webpack(
    utils.getRewriteConf().finalWebpack(require('../config/webpack.config')('development'))
);

compiler.watch({ aggregateTimeout: 300 }, (err, stats) => {
    // console.log(stats);
    if (handleMessage(stats)) {
        console.log(chalk.blue('编译成功！'));
    }
});
