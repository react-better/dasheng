/*
 * File: .eslintrc
 * Desc: 描述
 * File Created: 2020-05-21 22:09:09
 * Author: chenghao
 * ------
 * Copyright 2020 - present, karakal
 */
module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: 'react-app',
    rules: {
        'no-multi-spaces': 1,
        'react/jsx-tag-spacing': 1, // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
        'jsx-quotes': 1,
        'react/jsx-closing-bracket-location': 1, // 遵循JSX语法缩进/格式
        'react/jsx-boolean-value': 1, // 如果属性值为 true, 可以直接省略
        'react/no-string-refs': 1, // 总是在Refs里使用回调函数
        'react/self-closing-comp': 1, // 对于没有子元素的标签来说总是自己关闭标签
        'react/sort-comp': 1, // 按照具体规范的React.createClass 的生命周期函数书写代码
        'react/jsx-pascal-case': 1, // React模块名使用帕斯卡命名，实例使用骆驼式命名
    },
};
