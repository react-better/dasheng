# dasheng-scripts

dasheng&lt;大圣>-微前端编译工具脚本

```
yarn add dasheng-scripts
```

安装好之后，在 package.json 里面添加以下运行脚本指令：

```
"scripts": {
    // 开发中监听文件变化
    "start": "dasheng-scripts start",
    // 打包发布
    "build": "dasheng-scripts build"
},
```

自定义 webpack 配置，可以微前端项目根目录做以下操作:

-   新建.dasheng 文件夹
-   文件中新建 js 文件 index.js
-   index.js 中重写配置

```
module.exports = {
    finalWebpack: (config) => {
        // 自定义包名
        config.library = 'DaSheng';
        // 其他配置覆盖
        config.plugins.push(xxx);
        return config;
    }
}
```
