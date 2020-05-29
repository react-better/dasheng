#!/usr/bin/env node

const spawn = require('cross-spawn');
const chalk = require('chalk');

const args = process.argv.slice(2);
const scripts = ['start', 'build'];

if (!scripts.includes(args[0])) return console.log(chalk.red('未知的脚本指令，请重新输入'));

runScript(args[0]);

function runScript(fileName) {
    const result = spawn.sync('node', [require.resolve('../scripts/' + fileName)], {
        stdio: 'inherit',
    });
    process.exit(result.status);
}
