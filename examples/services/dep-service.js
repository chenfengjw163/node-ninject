module.exports = class DepService {
  constructor() {}
  depFn(args) {
    console.log('DepService say:', args, '; context:', this.$context);
  }
}