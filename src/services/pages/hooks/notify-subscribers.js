
import errors from 'feathers-errors'

export default options => {
  return async hook => {
    if (!hook.params.provider) { return hook; }

    if(hook.data && hook.data.published && hook.id) {
      try {
        let response = await hook.app.service('pages').get(hook.id)

        if(response && response.published === false) {
          console.log('page was published');
          hook.app.service('subscribe').create({
            "subject": `${response.author} just published ${response.title}.`,
            "message": `
              <h2>${response.title}</h2>
              <p>${response.description}</p>
              <a href="${hook.params.serverUrl + response.url}">Visit ${response.title}</a>
              <hr>
              <p><a href="%mailing_list_unsubscribe_url%">Stop following ${hook.params.serverUrl}</a></p>
            `
          })
        } else {
          return Promise.resolve(hook)
        }
      } catch(err) {
        console.log('Error checking page previous state', err);
        return Promise.resolve(hook)
      }

    }
    return hook

  }
}
