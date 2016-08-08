
var compileIndex = require('../../../components/compile-index');
var contains = ['clientID', 'appID', 'verificationID', 'recaptchaClientKey', 'recaptchaKey'];

module.exports = options => {
  const contains = options || ['clientID', 'appID', 'verificationID', 'recaptchaClientKey', 'recaptchaKey'];
  return hook => {
    if(contains.indexOf(hook.data.identifier.name) > -1) {
      compileIndex();
    }
  }
}
