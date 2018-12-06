const testService = require('../services/test-service');
const depService = require('../services/dep-service');
const dep2Service = require('../services/dep2-service');

module.exports = [
  {alias: 'testService', bind: testService},
  {alias: 'depService', bind: depService},
  {alias: 'dep2Service', bind: dep2Service},
];
