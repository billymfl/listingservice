/**
 * RedisStore class implementing the Storable interface
 *
 * @example
 * const redis = require('./redis');
 * const client = redis.getInstance();
 * const redisStore = new RedisStore({redis: client});
 *
 * @class
 *
 */

const Storable = require('./Storable');

/**
  * RedisStore class
  */
class RedisStore extends Storable {
  /**
     * @param  {object} config
     */
  constructor(config) {
    super();

    if (!config) {
      throw new Error('Must pass in a config to the constructor');
    }

    if (!config.redis) {
      // eslint-disable-next-line max-len
      throw new Error('Must pass in a redis client in the config to the constructor (config.redis)');
    }

    this.redis = config.redis;
  }

  /**
   * @param  {string} key name
   * @param  {string} data to store
   * @param  {int} expiration time to live
   * @return {boolean}
   */
  async save(key, data, expiration) {
    await this.redis.setex(key, expiration, data);
    return true;
  }

  /**
   * @param  {string} key
   * @return {object} the value at the key
   * @throws {Error}
   */
  async get(key) {
    try {
      const value = await this.redis.get(key);
      return value;
    } catch (err) {
      debug('TCL: RedisStore -> get -> err', err);
      throw new Error(err);
    }
  }

  /** Removes a key or keys
   * @param  {string} key names
   * @return {integer} number of keys removed
   */
  async remove(key) {
    const n = await this.redis.del(key);
    return n;
  }

  /** timeLeft returns the seconds key has left to live
   * @param  {string} key
   * @return {integer} seconds left for the key
   * @throws {Error}
   */
  async timeLeft(key) {
    try {
      const value = await this.redis.ttl(key);
      return value;
    } catch (err) {
      debug('TCL: RedisStore -> timeLeft -> err', err);
      throw new Error(err);
    }
  }
}

module.exports = RedisStore;
