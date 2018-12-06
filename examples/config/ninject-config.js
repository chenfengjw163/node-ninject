const TestService = require('../services/test-service');
const DepService = require('../services/dep-service');
const Dep2Service = require('../services/dep2-service');

module.exports = [
  {alias: 'testService', bind: TestService},
  {alias: 'depService', bind: DepService},
  {alias: 'dep2Service', bind: Dep2Service},
];
