const fs = require('fs');
const searchFolders = require('../../search-folders');

module.exports = async function() {
  const app = this;

	console.log('Checking for themes...');

  try {

    let activeTheme = await app.service('themes').find({ query: {active: true} });

    if(!Array.isArray(activeTheme)) { activeTheme = [activeTheme]; }

    if(!activeTheme[0] || !activeTheme[0].url) { activeTheme[0] = {url: ''}; }

    let themejsons = await searchFolders.retrieveThemes.call(app, activeTheme[0].url);

    themejsons.forEach(theme => {
      console.log("Sucessfully grabbed theme: " + theme.title);
    });

    await app.service('themes').remove(null, { query: {} });

    await app.service('themes').create(themejsons);

    console.log('themes initialized');

  } catch (err) {
    console.log("trouble fetching theme jsons: ", err);
  }

};
