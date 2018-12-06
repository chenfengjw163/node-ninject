module.exports = class TestService {
  constructor(depService, dep2Service) {
    this.depService = depService;
    this.dep2Service = dep2Service;
  }
  doSomething(args) {
    this.depService.depFn(args);
    this.dep2Service.dep2Fn(args);
  }
}