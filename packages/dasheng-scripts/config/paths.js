/*
 * File: paths.js
 * Desc: 描述
 * File Created: 2020-04-23 14:30:46
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx'];
const defaultExtension = 'js';
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );
    return resolveFn(`${filePath}.${extension || defaultExtension}`);
};

module.exports = {
    appSrc: resolveApp('src'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appBuild: resolveApp('build'),
    appTsConfig: resolveApp('tsconfig.json'),
};
