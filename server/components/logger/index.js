var winston = require('winston');
var path = require('path');
var config = require('../../config/environment');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, colorize : true, showLevel: false}),
    new winston.transports.DailyRotateFile({
		  datePattern: '.yyyy-MM-ddTHH',
		  filename: path.join(config.root, 'server', 'logs', 'debug.log'),
		  json: false, 
		  showLevel: false, 
		  maxFiles: 5
		})
  ],
  // exceptionHandlers: [
  //   new winston.transports.DailyRotateFile({
		//   datePattern: '.yyyy-MM-ddTHH',
		//   filename: path.join(config.root, 'server', 'logs', 'exceptions.log'),
		//   json: false, 
		//   showLevel: false, 
		//   maxFiles: 5
		// })
  // ],
  exitOnError: false
});

module.exports = logger;