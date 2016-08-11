
var compileIndex = require('../../../components/compile-index');
var contains = ['clientID', 'appID', 'verificationID', 'recaptchaClientKey', 'recaptchaKey'];

module.exports = options => {
  const contains = options || ['clientID', 'appID', 'verificationID', 'recaptchaClientKey', 'recaptchaKey'];
  return hook => {
    if(hook.params.query && contains.indexOf(hook.params.query.name) > -1) {
      console.log('recompiling html views');
      compileIndex();
    }
  }
}
