/*
 * File: createApp.ts
 * Desc: 创建项目
 * File Created: 2020-05-26 15:09:42
 * Author: chenghao
 * ------
 * Copyright 2020 - present, chenghao
 */
import path from 'path';
import log from './log';
import fs from 'fs-extra';
import { chalk } from './chalk';
import os from 'os';
import packageJson from './packageTmp.json';
import { execSync } from 'child_process';
import spawn from 'cross-spawn';

function createApp(appName: string, useNpm: boolean) {
    const root = path.resolve(appName);
    fs.ensureDirSync(root);
    log(chalk(`\n在${root}下，成功创建一个微前端项目${appName}\n`));

    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify({ ...packageJson, name: appName }, null, 4) + os.EOL
    );

    process.chdir(root);

    const useYarn = useNpm ? false : shoulUseYarn();
    installTemplate(root, useYarn);

    installDependencies(root, useYarn);

    setLastTips(appName);
}

function installTemplate(root: string, useYarn: boolean) {
    const templateToInstall = ['dasheng-temp'];
    log(chalk('\n开始安装模板...\n'));
    install(root, useYarn, templateToInstall);

    copyTemplateToRoot(root, templateToInstall[0].replace('@beta', ''));

    remove(root, useYarn, templateToInstall);
}

function installDependencies(root: string, useYarn: boolean) {
    log(chalk('\n正在安装依赖包，请耐心等待几分钟...\n'));
    const dependenciesToInstall = [
        'react',
        '@types/react',
        'react-dom',
        '@types/react-dom',
        'dasheng-scripts',
    ];
    install(root, useYarn, dependenciesToInstall);
}

function install(root: string, useYarn: boolean, dependencies: string[]) {
    runCmd({ root, useYarn, dependencies, cmds: ['add', 'install'] });
}

function remove(root: string, useYarn: boolean, dependencies: string[]) {
    runCmd({ root, useYarn, dependencies, cmds: ['remove', 'uninstall'] });
}

function runCmd({
    root,
    useYarn,
    dependencies,
    cmds,
}: {
    root: string;
    useYarn: boolean;
    dependencies: string[];
    cmds: string[];
}) {
    let command, args;
    if (useYarn) {
        command = 'yarn';
        args = [cmds[0], '--cwd', root, ...dependencies];
    } else {
        command = 'npm';
        args = [cmds[0], ...dependencies];
    }
    spawn.sync(command, args, { stdio: 'inherit' });
}

function shoulUseYarn() {
    try {
        execSync('yarn --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

function copyTemplateToRoot(root: string, template: string) {
    const tempDir = path.join(path.resolve(root), `node_modules/${template}/template`);
    fs.copySync(tempDir, root);
}

function setLastTips(appName: string) {
    log(chalk('\n✅  已经成功安装dasheng<大圣>微前端模板项目✨\n'));
    log(chalk(`请进入项目目录进行编程：cd ${appName}\n`));
    log(chalk('启动项目：'));
    log(chalk('    yarn start\n'));
    log(chalk('打包项目：'));
    log(chalk('    yarn build\n'));
    log(chalk('☕  祝您编程愉快~~~\n'));
    log(
        chalk(
            '🎯  更多关于dasheng<大圣>微前端解决方案的信息，请查看网站：https://github.com/karakal-FET/dasheng'
        )
    );
}

export default createApp;
