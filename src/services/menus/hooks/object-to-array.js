import _ from 'lodash';

export default options => {
  return hook => {

    if(hook.data && typeof hook.data === 'object' && !Array.isArray(hook.data)) {
      let finalArray = [];
      for (var key in hook.data) {
        if (hook.data.hasOwnProperty(key)) {
          finalArray = hook.data[key].concat(finalArray);
        }
      }
      hook.data = finalArray;
    }
  }
}
