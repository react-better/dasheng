/*
 * File: utils.js
 * Desc: 工具类
 * File Created: 2020-05-18 18:40:47
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
const path = require('path');
const fs = require('fs');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

/**
 * 获取重写配置
 */
const getRewriteConf = () => {
    const rootDir = path.resolve(process.cwd(), '.dasheng');
    const configPath = path.join(rootDir, 'index.js');
    const exists = fs.existsSync(configPath);
    if (!exists) return { finalWebpack: (config) => config };
    const rewriteConf = require(configPath);
    return rewriteConf;
};

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
        console.log(chalk.yellow('大圣：打包出现以下警告提示，请注意！\n'));
        console.log(chalk.yellow(message.warnings.join('\n\n')));
        return true;
    }
    return false;
}

function handleErrors(message) {
    if (message.errors.length) {
        console.log(chalk.red('大圣：打包出现以下异常提示，请修复！\n'));
        console.log(chalk.red(message.errors.join('\n\n')));
        return true;
    }
    return false;
}

module.exports = {
    getRewriteConf,
    handleErrors,
    handleMessage,
    handleWarnings
};
