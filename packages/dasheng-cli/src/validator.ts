/*
 * File: validator.js
 * Desc: 描述
 * File Created: 2020-05-25 13:59:20
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
import validatePackageName from 'validate-npm-package-name';
import log from './log';
import { chalkWarn, chalkError } from './chalk';

/**
 * 校验项目名称是否为空
 * @param proName
 */
function validateProName(proName: string) {
    if (!proName) {
        log(chalkWarn('请输入想要创建的项目名称！'));
        process.exit(1);
    }
}

/**
 * 校验项目名称是否合法有效
 * @param proName
 */
function validateSymbol(proName: string) {
    const result = validatePackageName(proName);
    if (!result.validForNewPackages) {
        log();
        log(chalkError(`不能创建以${proName}命名的项目，因为：\n`));
        [...(result.errors || []), ...(result.warnings || [])].forEach((err) => {
            log(chalkError(`${err} \n`));
        });
        process.exit(1);
    }
}

/**
 * 校验名称相关
 * @param proName
 */
export function validateName(proName: string) {
    validateProName(proName);
    validateSymbol(proName);
}
