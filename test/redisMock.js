// mock redis
const redis = {
  store: new Map(),

  getInstance: function() {
    return this;
  },

  setex: function(k, e, v) {
    this.store.set(k, {value: v, ttl: e});
    return true;
  },

  get: function(k) {
    const v = this.store.get(k);
    if (v) {
      return v.value;
    }
    return undefined;
  },

  del: function(k) {
    const bool = this.store.delete(k);
    return bool ? 1 : 0;
  },

  ttl: function(k) {
    const v = this.store.get(k);
    if (v) {
      return v.ttl;
    }
    return -1;
  },
};

module.exports = redis;
