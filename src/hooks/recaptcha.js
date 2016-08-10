export default (options) => {
  return async (hook) => {
    try {
      Promise.resolve(hook);
    } catch(err) {
      Promise.reject(err);
    }
  }
};
