const ninject = require('../index');
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


  const testController2 = ninject.createInstance(TestController, {$context: context});


  testController2.doAction('I`m is Ninject2');
} catch (error) {
  console.log(error)
}