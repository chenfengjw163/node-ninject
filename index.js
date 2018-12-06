const _ = require('lodash');
const REG_CONST = /constructor[^(]*\(([^)]*)\)[^{]*\{/;
const dependCaches = new WeakMap();

module.exports = {
  init: function(config) {
    this.injectConfig = config;
  },
  createInstance: function(Type, injects) {
    if (!Type) {
      throw new Error('[node-ninject] Type is undefined or null', Type);
    }
    if (_.isEmpty(this.injectConfig)) {
      throw new Error('[node-ninject] injectConfig not initialization');
    }
    let depends;

    if (dependCaches[Type]) {
      depends = dependCaches[Type];
    } else {
      const code = Type.prototype.constructor.toString();
      const matchs = REG_CONST.exec(code);
  
      depends = matchs && matchs[1] && _.map(_.split(matchs[1], ','), arg => {
        const injectObj = _.find(this.injectConfig, c => c.alias === _.trim(arg));
  
        if (injectObj) {
          return injectObj.bind;
        }
        throw new Error(`[node-ninject] not found '${arg}' relation`);
      }) || [];
      dependCaches[Type] = depends;
    }
  
    try {
      const dependsInstances = _.map(depends, d => this.createInstance(d, injects));
      const instance = new Type(...dependsInstances);
  
      if (injects) {
        _.each(injects, (inject, key) => {
          instance[key] = inject;
        });
      }
      return instance;
    } catch (e) {
      throw new Error(e);
    }
  }
}
