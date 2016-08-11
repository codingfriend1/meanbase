import _ from 'lodash';

export default function(options) {
  return (hook) => {
    console.log("hook.data", hook.data);
    if (!hook.params.provider || !hook.data) { return hook; }

    if(typeof hook.data.url === 'string' && hook.data.url.charAt(0) !== '/') {
      hook.data.url = '/' + hook.data.url;
    }

    if(hook.data.extensions) {
      hook.data.extensions = _.values(hook.data.extensions);
    }

    if(hook.data.images) {
      hook.data.images = _.values(hook.data.images);
    }


    console.log("hook.data", hook.data);

    return hook;
  }
}
