/**
 * A class to represent the interface of a Storage class
 * @class
 *
 */


/**
  * Storable interface
  */
class Storable {
  /**
     * @constructor
     */
  constructor() {
    if (this.constructor === Storable) {
      throw new TypeError('Abstract interface Storable cannot be instantiated.');
    }

    if (!this.save) {
      throw new Error('must implement save method');
    }

    if (!this.get) {
      throw new Error('must implement get method');
    }

    if (!this.remove) {
      throw new Error('must implement remove method');
    }

    if (!this.timeLeft) {
      throw new Error('must implement timeLeft method');
    }
  }

  /*
    async save(key string, value object, expiration int) bool
    async get(key string) object, throws Error
    async remove(key string) bool
    async timeLeft(key string) int, throws Error
  */
}

module.exports = Storable;
