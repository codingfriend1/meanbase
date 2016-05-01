'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URL || 'mongodb://localhost/meanbase-dev'
  },

  seedDB: true
};
