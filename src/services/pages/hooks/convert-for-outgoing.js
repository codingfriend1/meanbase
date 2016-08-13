import { arrayToObjectWithObject, arrayToObjectWithArray } from '../../../components/utility';

export default options => {
  return hook => {
    if(!hook.result) { return hook; }
    if(Array.isArray(hook.result)) {
      for (var i = 0; i < hook.result.length; i++) {
        let page = hook.result[i];
        page.images = arrayToObjectWithObject(page.images, 'location');
        page.extensions = arrayToObjectWithArray(page.extensions, 'group');
        if(!page.extensions) {
          page.extensions = {};
        }
      }
    } else {
      hook.result.images = arrayToObjectWithObject(hook.result.images, 'location');
      hook.result.extensions = arrayToObjectWithArray(hook.result.extensions, 'group');
      if(!hook.result.extensions) {
        hook.result.extensions = {};
      }
    }

    return hook;
  }
}
