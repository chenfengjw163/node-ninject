module.exports = class Dep2Service {
  constructor() {}
  dep2Fn(args) {
    console.log('Dep2Service say:', args, '; context:', this.$context);
  }
}