const chai = require('chai');
const assert = chai.assert;
const redis = require('../modules/redis');
const RedisStore = require('../modules/RedisStore');
const cache = require('../modules/cache');

const redisClient = redis.getInstance();
const redisStore = new RedisStore({redis: redisClient});

describe('Cache', function() {
  let cacheStore;
  const key = 'mocha-mock-key-testing';
  const data = 'mocha-mock-data-testing';
  const ttl = 5;

  before(function() {
    cacheStore = cache({store: redisStore});
  });

  it('should create a cache', function() {
    assert.isObject(cacheStore, 'failed to create cache');
  });

  it('should save a key', async function() {
    await cacheStore.save(key, data, ttl);
    const val = await cacheStore.get(key);
    assert.equal(val, data, 'failed to get set key');
  });

  it('should get the timeLeft', async function() {
    const val = await cacheStore.timeLeft(key);
    assert.equal(val, ttl, 'failed to get timeLeft');
  });

  it('should delete the key', async function() {
    const val = await cacheStore.remove(key);
    assert.equal(val, 1, 'failed to delete key');
  });
});

