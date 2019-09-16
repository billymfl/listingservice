/**
 * A class to represent a Cache
 *
 * @example
 * const cache = require('./cache');
 * cons redisClient = ....
 * const cacheStore = cache({store: redisClient});
 * await cacheStore.save('test', 'value);
 * await cacheStore.del('test');
 *
 * @class
 *
 * @property store the instance that will act as the storage
 */

/**
  * Cache class
  */
class Cache {
  /** Cache contructor
   * @constructor
   * @private
   * @param {object} config object to inject the storage system to be used
    */
  constructor(config) {
    if (!config) {
      throw new Error('Must pass in a config to the constructor');
    }

    if (!config.store) {
      throw new Error('Must pass in a store in the config to the constructor (config.store)');
    }

    this.store = config.store;
  }

  /** Save a value with key and expiration time
   * @param  {string} key name
   * @param  {string} data to store
   * @param  {int} expiration time to live
   * @return {boolean}
   */
  async save(key, data, expiration) {
    await this.store.save(key, data, expiration);
    return true;
  }

  /** Gets value for a key
   * @param  {string} key
   * @return {object} the value at the key
   */
  async get(key) {
    try {
      const value = await this.store.get(key);
      return value;
    } catch (err) {
      return null;
    }
  }

  /** Removes a key
   * @param  {string} key name
   * @return {integer} number of keys removed
   */
  async remove(key) {
    const n = await this.store.remove(key);
    return n;
  }

  /** timeLeft returns the seconds key has left to live
   * @param  {string} key
   * @return {integer} seconds left for the key
   */
  async timeLeft(key) {
    try {
      const value = await this.store.timeLeft(key);
      return value;
    } catch (err) {
      return -1;
    }
  }
}

/** Cache builder
 * @param  {object} config
 * @return {object} instance of Cache
 */
function cache(config) {
  return new Cache(config);
}

module.exports = cache;
