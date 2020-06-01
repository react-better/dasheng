# dasheng-loader

dasheng&lt;大圣>-微前端加载组件

在主项目中安装组件

```
yarn add dasheng-loader
```

使用方法

```
// 1.提前将需要贡献框架代码的react等注册到windows对象下
import React from 'react';
windows.react = React;

// 2.在使用微前端的地方使用加载组件加载微前端
import DaSheng from 'dasheng-loader';

// compName为组件名称，即使用微前端脚本工具打包之后的文件包名
// url为微前端部署地址，可以直接传url属性，也可以提前注册域名路径:
// DaSheng.origin('https://xxxx');
<DaSheng url="https://xxxxx" compName="Hello" />
```
