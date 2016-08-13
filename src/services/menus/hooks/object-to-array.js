import _ from 'lodash';

export default options => {
  return hook => {

    if (!hook.params.provider) { return hook; }

    let isObjectOfArrays = false;
    if(hook.data && typeof hook.data === 'object' && !Array.isArray(hook.data)) {
      let finalArray = [];
      for (var key in hook.data) {
        if (hook.data.hasOwnProperty(key)) {
          const menu = hook.data[key];
          if(Array.isArray(menu)) {
            isObjectOfArrays = true;
            break;
          }
        }
      }

      if(isObjectOfArrays) {
        let returnArray = [];
        for (let property in hook.data) {
          if (hook.data.hasOwnProperty(property)) {
            returnArray = returnArray.concat(hook.data[property]);
          }
        }

        hook.data = returnArray;
        return hook;
      } else {
        return hook;
      }
    }
    return hook;
  }
}
