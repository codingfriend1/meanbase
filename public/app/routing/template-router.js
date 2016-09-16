export default (resolve, reject) => {
  (async() => {
    try {
      // this.isLoggedIn = await Auth.isLoggedIn();
      // this.currentUser = Auth.currentUser();

      const currentRoute = window.location.pathname

      let matchingPages = await api.pages.find({url: currentRoute})

      let stagingData
      try {
        let hasPermission = await Auth.hasPermission('editContent')
        if(hasPermission) {
          try {
            stagingData = await api.staging.find({key: currentRoute})
            stagingData = stagingData[0]
          } catch(err) {
            console.log('Trouble getting staging data', err);
          }
        }
      } catch(err) {
        console.log('User does not have edit permission', err);
      }

      if(!_.get(matchingPages, '0')) {
        throw 'Sorry but we could not find a page with that url'
      }

      let page = matchingPages[0]


      // Loop through the template mapping stored in themeTemplates.
      // That variable came from the theme's theme.json file.
      // It finds which template to load based on the template that came back for the page
      // This is done to keep different themes' templates compatible
      var mappedTemplate
      if(stagingData && stagingData.data && stagingData.data.template) {
        mappedTemplate = stagingData.data.template
      } else {
        mappedTemplate = page.template;
      }

      for (var property in meanbaseGlobals.themeTemplates) {
        if (meanbaseGlobals.themeTemplates.hasOwnProperty(property)) {
          if(meanbaseGlobals.themeTemplates[property].indexOf(mappedTemplate) > -1) {
            mappedTemplate = property;
            break;
          }
        }
      }
      // - Construct a url string from the theme name and template name to pass into $templateFactory
      if(!window.meanbaseGlobals.themeTemplatePaths[mappedTemplate]) {
        throw `Could not find template: ${page.template}, try adding it to your theme template mapping`
      }

      var templatePath = window.meanbaseGlobals.themeTemplatePaths[mappedTemplate].template;

      if(!templatePath) {
        throw `Hmmm the ${page.template} template is missing, make sure to add it to your theme's template mapping`
      }

      // - Save the rest of the page data on the meanbaseGlobals object for use in the rest of the app
      if(page.tabTitle) {
        document.title = page.tabTitle;
      }

      if(page.description) {
        jQuery('meta[name=description]').attr('content', page.description);
      }

      let html = require("../../" + templatePath)

      if(html) {
        let templateComponent = Vue.extend({
          template: html,
          data: () => ({
            page
          })
        })

        return resolve(templateComponent);
      } else {
        throw "Could not find the html for that template"
      }


    } catch(err) {
      console.log('Error loading template', err);
      toastr.error(err);
      const page = {
        tabTitle: 404,
        description: 'Could not find page',
        extensions: {},
        content: {},
        url: 'missing'
      };

      let templateComponent = Vue.extend({
        template: require('./missing.jade'),
        data:() => ({
          page
        })
      })

      return resolve(templateComponent);
    }
  })()
}
