const searchFolders = require('../../search-folders');

module.exports = async function() {

  const app = this;

	console.log('checking for extensions...');

	const extensionjsons = await searchFolders.retrieveExtensions.call(this);

	// We are putting this on the global so that when the client/index.html is compiled it will include the extension links
  if(!global.meanbaseGlobals) { global.meanbaseGlobals = {}; }
  global.meanbaseGlobals.extensions = extensionjsons;

	if(extensionjsons.length === 0) {
    console.log('no extensions found');
    return false;
  }

  try {
    await app.service('extension').remove(null, {query: {}});
		await app.service('extension').create(extensionjsons);
    console.log('extensions initialized');
  } catch (err) {
    console.log('Initializing extensions error: ', err);
  }
};
