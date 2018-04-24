## 注意事项 

### 插件安装

* Redux DevTools

### 部署
* 新环境需要修改repository地址 参见:[npm换源](../README.md#npm换源)

* 从git push 代码后，如果依赖版本发生变化需要 npm I & npm run build:dll


### 开发

#### Form表单使用
初始化数据使用 onFieldsChange 与 mapPropsToFields 方法


### 生产部署

* 所有打生产包的情况，utils/config下不要有MOCK的接口调用，全部要使用真实接口地址
* nginx/config下的nginx.conf配置代理地址，需要和.roadhogrc.js下的代理地址一致
