import errors from 'feathers-errors'

export default options => {
  return hook => {

    console.log("process.env", process.env);

    console.log("hook.data.email", hook.data.email);

    if(process.env.EMAIL && hook.data && hook.data.email) {

      console.log('sending email');

      let email = {
         from: process.env.EMAIL,
         to: hook.data.email,
         subject: 'Meanbase - Account Verification Email',
         html: 'Please visit this link to verify your meanbase account.'
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
