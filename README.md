# node-ninject
nodejs端的DI库，可以方便的在类的构造函数中注入依赖

# Installation
`npm install node-ninject`

or

`yarn add node-ninject`

# API

## Ninject
### init(config: ninjectConfig)
config: ninject的映射配置

### createInstance(type: Type, [injects: Object])
type: 类型

injects：注入到实例化链中的上下文对象(注入后当前实例化对象和所有依赖关系的实例化对象都拥有该上下文，在nodejs中传递请求上下文很有用)


## NinjectConfig
数组对象，维护类型和别名的映射，ninject从中读取实例化的类型。

`{alias: 'testService', bind: TestService}`


# Usage
`ninject-config.js`
``` javascript
const TestService = require('../services/test-service');
const DepService = require('../services/dep-service');
const Dep2Service = require('../services/dep2-service');

module.exports = [
  {alias: 'testService', bind: TestService},
  {alias: 'depService', bind: DepService},
  {alias: 'dep2Service', bind: Dep2Service},
];

```
`test-controller.js`
``` javascript
module.exports = class TestController {
  constructor(testService) {
    this.testService = testService;
  }
  doAction(args) {
    this.testService.doSomething(args);
  }
};

```
`index.js`
``` javascript
const ninject = require('node-ninject');
const ninjectConfig = require('./config/ninject-config');
const TestController = require('./controllers/test-controller');

ninject.init(ninjectConfig);

const context = {
  req: {
    url: 'http://xxx.com'
  },
  res: {}
};
try {
  const testController = ninject.createInstance(TestController, {$context: context});

  testController.doAction('I`m is Ninject');
} catch (error) {
  console.log(error)
}
```

# License

node-ninject is licensed under a [MIT  License](./LICENSE).