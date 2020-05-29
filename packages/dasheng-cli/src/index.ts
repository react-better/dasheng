/*
 * File: index.js
 * Desc: 描述
 * File Created: 2020-05-25 12:47:42
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */

import { Command } from 'commander';
import packageJson from '../package.json';
import * as validator from './validator';
import * as cmd from './command';
import { chalk } from './chalk';
import createApp from './createApp';
import log from './log';

let projectName: string = '';
const program = new Command()
    .name(packageJson.name)
    .description(chalk('创建dasheng<大圣>微前端模板项目'))
    .version(packageJson.version, '-V, --version', '获取dasheng<大圣>脚手架版本号信息')
    .arguments('<project-name>')
    .usage(`${chalk('<project-name>')} [options]`)
    .action((name) => (projectName = name))
    .allowUnknownOption()
    .option('--use-npm', '使用NPM下载依赖包（默认使用yarn下载依赖包）')
    .helpOption('-h, --help', '帮助')
    .on('--help', () => cmd.help())
    .parse(process.argv);

console.log(program.useNpm);
validator.validateName(projectName!);
createApp(projectName, program.useNpm);
