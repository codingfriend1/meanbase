module.exports = options => {
  return hook => {
    if(hook.data && hook.data.approved) {
      hook.data.approved = false;
    }
  }
}
