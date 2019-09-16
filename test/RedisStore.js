const RedisStore = require('../modules/RedisStore');
const chai = require('chai');

const assert = chai.assert;

describe('RedisStore', function() {
  it('should implement the Storable interface', function() {
    const redisStore = new RedisStore({redis: {}});
    assert.isObject(redisStore);
  });
});
