/**
 * A class to represent the redis client with promisified methods.
 * Usage:
 * const redis = require('./redis');
 * const client = redis.getInstance();
 *
 * @class
 *
 * @requires     NPM:redis
 */

const _redis = require('redis');
const {promisify} = require('util');
const {REDIS_PORT, REDIS_HOST, debug} = require('../config');

/**
 * Redis class
 */
class Redis {
  /**
     * @constructor
     */
  constructor() {
    this._client;
  }

  /** getInstance returns the instance of redis client or initializes it first
   * @return {object} reference to promisified redis client
   */
  getInstance() {
    if (!this._client) {
      const client = _redis.createClient({
        port: REDIS_PORT,
        host: REDIS_HOST,
      });

      client.on('ready', () => {
        debug('Redis is ready');
      });

      client.on('error', (err) => {
        console.error('Redis error', err);
      });

      this._client = {};
      this._client.get = promisify(client.get).bind(client);
      this._client.setex = promisify(client.setex).bind(client);
      this._client.ttl = promisify(client.ttl).bind(client);
      this._client.del = promisify(client.del).bind(client);
    }
    return this._client;
  }
}

module.exports = new Redis();
