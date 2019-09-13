const chai = require('chai');
const assert = chai.assert;
const Redis = require('../modules/RedisClient');
const _Cache = require('../modules/Cache');

const redisClient = Redis.getInstance();

describe('Cache', function() {
  let Cache;
  const key = 'mocha-mock-key-testing';
  const data = 'mocha-mock-data-testing';
  const ttl = 5;

  before(function() {
    Cache = _Cache.getInstance(redisClient);
  });

  it('should be a singleton', function() {
    const Cache2 = _Cache.getInstance(redisClient);
    assert.equal(Cache, Cache2, 'failed to get same object');
  });

  it('should save a key', async function() {
    await Cache.save(key, ttl, data);
    const val = await Cache.get(key);
    assert.equal(val, data, 'failed to get set key');
  });

  it('should get the time to live', async function() {
    const val = await Cache.timeToLive(key);
    assert.equal(val, ttl, 'failed to get ttl');
  });

  it('should delete the key', async function() {
    const val = await Cache.del(key);
    assert.equal(val, 1, 'failed to delete key');
  });
});

