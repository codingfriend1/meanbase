import errors from 'feathers-errors'

export default options => {
  return hook => {

    if (!hook.params.provider) { return hook; }

    const user = hook.result

    if(process.env.EMAIL && hook.data && hook.data.email && user) {

      let link
      if(hook.app.get('port')) {
        link = `http://${hook.app.get('host')}:${hook.app.get('port')}/cms/account/verify/${user.verifyToken}`
      } else {
        link = `http://${hook.app.get('host')}/cms/account/verify/${user.verifyToken}`
      }

      let email = {
         from: process.env.EMAIL,
         to: hook.data.email,
         subject: 'Meanbase - Account Verification',
         html: `Dear ${user.name}, please click this link to verify your email address. ${link}`
      }

      hook.app.service('emails').create(email).then(function (result) {
        console.log('Sent email', result);
      }).catch(err => {
        console.log('Error sending email', err);
      });
    }

    return hook
  }
}
