module.exports = class TestController {
  constructor(testService) {
    this.testService = testService;
  }
  doAction(args) {
    this.testService.doSomething(args);
  }
};
