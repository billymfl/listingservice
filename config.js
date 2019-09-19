/**
 *  @fileOverview Contains the environment variables used by the app and the schema to
 *  validate agaist the input.
 *
 *  @author       Billy Marin
 *
 *  @requires     NPM:@hapi/Joi
 *
 */

const pkg = require('./package');
const Joi = require('@hapi/joi');

exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.APPNAME = pkg.name;
exports.VERSION = pkg.version;

// debug is only active if DEBUG=appname is passed in
exports.debug = require('debug')(exports.APPNAME);

// define the schema of the environment variables
const schema = Joi.object().keys({
  PORT: Joi.number().integer().min(80).max(65535).default(80),
  HOST: Joi.string().hostname().default('0.0.0.0'),
  REDIS_HOST: Joi.string().hostname().required(),
  REDIS_PORT: Joi.number().integer().default(6379),
  MONGO_HOST: Joi.string().hostname().required(),
  MONGO_PORT: Joi.number().integer(),
  MONGO_DB: Joi.string().required(),
});

// if there is a validation error set _error, else assign env vars. usually we should exit on error.
const result = schema.validate(process.env, {stripUnknown: true});
if (result.error) {
  exports._error = 'Invalid configuration:\n' + result.error.details
      .map((error) => error.message)
      .join('.\n');
} else {
  // do any other processing here on the variables before they are assigned to the exports
  exports.REDIS_URL = `redis://${result.value.REDIS_HOST}:${result.value.REDIS_PORT}/0`;

  let host;
  if (result.value.MONGO_PORT) {
    host = `${result.value.MONGO_HOST}:${result.value.MONGO_PORT}`;
  } else {
    host = result.value.MONGO_HOST;
  }
  const user = encodeURIComponent(result.value.MONGO_USER);
  const password = encodeURIComponent(result.value.MONGO_PWD);

  exports.MONGO_URL = `mongodb://${user}:${password}@${host}/?authMechanism=DEFAULT`;

  Object.assign(exports, result.value);
}
