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

module.exports = {
    getRewriteConf,
};
