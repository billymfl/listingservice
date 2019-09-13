/**
 * A class to represent a Cache using redis
 * @class
 *
 * @requires     NPM:redis
 * @property instance the instance of the class
 * @property redisClient the instance of the redisClient
 */

/**
  * Cache class
  */
class Cache {
  /** Cache contructor
   * @constructor
   * @private
   * @param {object} redis object to inject
    */
  constructor() {
    this.redisClient;
  }

  /**
 * @param  {object} redis client to use
 * @return {object} this
 */
  getInstance(redis) {
    if (!this.redisClient) {
      this.redisClient = redis;
    }
    return this;
  }

  /**
   * @param  {string} key name
   * @param  {int} expiry time to live
   * @param  {string} data to store
   * @return {boolean}
   */
  async save(key, expiry, data) {
    await this.redisClient.setex(key, expiry, data);
    return true;
  }

  /**
   * @param  {string} key
   * @return {string|boolean}
   */
  async get(key) {
    try {
      const value = await this.redisClient.get(key);
      return value;
    } catch (err) {
      debug('TCL: Cache -> get -> err', err);
      return false;
    }
  }

  /**
   * @param  {string} key
   */
  async timeToLive(key) {
    try {
      const value = await this.redisClient.ttl(key);
      return value;
    } catch (err) {
      debug('TCL: Cache -> timeToLive -> err', err);
      return false;
    }
  }

  /**
   * @param  {string} key name
   * @return {integer} number of keys removed
   */
  async del(...keys) {
    const i = await this.redisClient.del(keys);
    return i;
  }
}

module.exports = new Cache();
