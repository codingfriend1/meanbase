const fs = require('fs');
const Finder = require('fs-finder');
const path = require('path');
const _ = require('lodash');
import feathersErrors from 'feathers-errors'
import fse from 'fs-extra'
const xml2json = require('xml-to-json');

/**
 * Requires hook.params.themeUrl to be set. If theme has all necessary content, it sets hook.data to the theme data
 */
export default function(options) {
  return hook => {

    return new Promise(async (resolve, reject) => {

      if(!hook.params.jsonData) { return reject('xmlToJsonData not found.'); }

      const wordpressData = hook.params.jsonData;

      var pages = [];
    	var comments = [];
    	var menus = [];

    	var position = 0;

    	var wordpressPages = wordpressData.rss.channel.item;
      var existingUrls = [];
    	for(var idx = 0; idx < wordpressPages.length; idx++) {
    		var wpPage = wordpressPages[idx];

    		if(wpPage["wp:post_type"] === "post" || wpPage["wp:post_type"] === "page") {


    			var meanbasePage = {};

    			meanbasePage.url = '/' + wpPage['wp:post_name'];
    			meanbasePage.template = wpPage["wp:post_type"];
    			meanbasePage.created = wpPage["wp:post_date"];
    			meanbasePage.updated = wpPage["wp:post_date"];
    			meanbasePage.author = wpPage["dc:creator"];
    			meanbasePage.tabTitle = wpPage["title"];
    			meanbasePage.published = (wpPage["pubDate"] !== "Mon, 30 Nov -0001 00:00:00 +0000")? true: false;
    			meanbasePage.title = wpPage["title"];
    			meanbasePage.content = {
            "content-1": wpPage["content:encoded"]
          };
    			meanbasePage.description = wpPage["description"];
    			meanbasePage.summary = wpPage["excerpt:encoded"];

    			if(wpPage["wp:comment"]) {
    				for(var x = 0; x < wpPage["wp:comment"].length; x++) {
    					var wpComment = wpPage["wp:comment"][x];
    					var comment = {};
    					comment.author = wpComment['wp:comment_author'];
    					comment.content = wpComment['wp:comment_content'];
    					comment.url = '/' + wpPage['wp:post_name'];
    					comment.date = wpComment['wp:comment_date'];
    					comment.email = wpComment['wp:comment_author_email'];
    					comment.ip = wpComment['wp:comment_author_IP'];
    					comment.approved = (wpComment['wp:comment_approved'] === "1")? true: false;
    					comments.push(comment);
    				}
    			}

    			var menu = {};
    			menu.title = wpPage["title"] || '/' + wpPage['wp:post_name'];
    			menu.url = '/' + wpPage['wp:post_name'];
    			menu.group = 'main';
    			menu.position = position++;

    			menus.push(menu);


          if(existingUrls.indexOf(meanbasePage.url) > -1) {
            if(meanbasePage.published) {
              for (var i = 0; i < pages.length; i++) {
                if(pages[i].url === meanbasePage.url) {
                  pages[i] = meanbasePage;
                }
              }
            }
          } else {
            existingUrls.push(meanbasePage.url);
            pages.push(meanbasePage);
          }

    		} //=== post or === page

    	}

      existingUrls = [];


      try {
        await hook.app.service('comments').remove(null, {query: {}});
        await hook.app.service('comments').create(comments);
        console.log("WordPress comments saved");
      } catch(err) {
        console.log('Error saving wordpress data', err);
        return reject(new feathersErrors.GeneralError('Could not save the wordpress comment data.'));
      }

      try {
        await hook.app.service('pages').remove(null, {query: {}});
        await hook.app.service('pages').create(pages);
        console.log("WordPress pages saved");
      } catch(err) {
        console.log('Error saving wordpress data', err);
        return reject(new feathersErrors.GeneralError('Could not save the wordpress pages data.'));
      }

      try {
        await hook.app.service('menus').remove(null, {query: {}});
        await hook.app.service('menus').create(menus);
        console.log("WordPress menus saved");
      } catch(err) {
        console.log('Error saving wordpress data', err);
        return reject(new feathersErrors.GeneralError('Could not save wordpress menu data.'));
      }

    	position = 0;
      return resolve(hook);
    });
  }
};
