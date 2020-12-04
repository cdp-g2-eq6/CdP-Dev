// it will use the testing db (see config/test.json)
const axios = require('axios');

const api = () => {
  return axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000/api/',
  });
};

/**
 * Note: The test server will use the "test" database. It gets
 * cleaned up at each server startup. No need to do it here. We
 * are not speaking to the BD directly, but rather to the API.
 */

module.exports = api;
