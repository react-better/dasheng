/*
 * File: command.ts
 * Desc: 命令相关操作
 * File Created: 2020-05-26 12:00:53
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
import log from './log';
import { chalk } from './chalk';

export function help() {
    log(chalk('\n\ndasheng<大圣> 微前端解决方案脚手架\n'));
    log(chalk('用于一键下载微前端模板项目\n'));
    log(chalk('下载微前端模板指令如下：\n'));
    log(chalk('dasheng-cli micro-front \n'));
    log(chalk('更多详细信息请访问 https://google.com \n'));
}
