

exports.objectOfArraysToArrayOfObjects = function(data) {
  let isObjectOfArrays = false;
  if(data && typeof data === 'object' && !Array.isArray(data)) {
    let finalArray = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        const menu = data[key];
        if(Array.isArray(menu)) {
          isObjectOfArrays = true;
          break;
        }
      }
    }

    if(isObjectOfArrays) {
      let returnArray = [];
      for (let property in data) {
        if (data.hasOwnProperty(property)) {
          returnArray = returnArray.concat(data[property]);
        }
      }

      return returnArray;
    } else {
      return data;
    }
  }

  return data;
};


exports.arrayToObjectWithObject = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if( !Array.isArray(array) ) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      returnObject[specialProperty] = array[ii];
    }
  } //for
  return returnObject;
};

exports.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if(!Array.isArray(array)) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      if(returnObject[specialProperty] === undefined) {
        returnObject[specialProperty] = [];
      }
      returnObject[specialProperty].push(array[ii]);
    }

  } //for

  return returnObject;
};
