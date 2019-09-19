const MongoClient = require('mongodb').MongoClient;
const {MONGO_URL, MONGO_DB} = require('../config');

/**
 * Mongo class
 */
class Mongo {
  /**
   * @constructor
   */
  constructor() {
    this.db;
  }

  /** getInstance returns the instance of redis client or initializes it first
   * @return {object} reference to promisified redis client
   * @throws {Error}
   */
  async getInstance() {
    if (!this.db) {
      const client = new MongoClient(MONGO_URL, {useNewUrlParser: true});

      try {
        await client.connect();
        this.db = client.db(MONGO_DB);
      } catch (err) {
        throw new Error(err);
      }
    }
    return this.db;
  }
}

module.exports = new Mongo();
