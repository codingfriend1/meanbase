const fs = require('fs');
const Finder = require('fs-finder');
const path = require('path');
const _ = require('lodash');
import feathersErrors from 'feathers-errors'
import fse from 'fs-extra'
const xml2json = require('xml-to-json');

/**
 * Requires hook.params.themeUrl to be set. If theme has all necessary content, it sets hook.data to the theme data
 */
export default function(options) {
  return hook => {

    return new Promise((resolve, reject) => {

      if(!hook.params.tempFilePath) { return reject('tempFilePath not found.'); }

      return xml2json({input: hook.params.tempFilePath}, function(err, result) {
  		    if(err) {
            console.error('Error convert wordpress xml to json', err);
		        return reject(new feathersErrors.Unprocessable('Could not convert wordpress xml to json'));
  		    } else {
            hook.params = Object.assign(hook.params, {jsonData: result});
            return resolve(hook);
  		    }
  		});

    });
  }
};
