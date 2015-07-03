var config = require('../../config/environment/index');
var fs = require('fs');
var app = config.app;
var xml2json = require('xml-to-json');

var CommentsModel = require('../comments/comments.model.js');
var PagesModel = require('../pages/pages.model.js');
var MenusModel = require('../menus/menus.model.js');

module.exports = function(filePath) {
	try {
		xml2json({input: filePath}, function(err, result) {
		    if(err) {
		        console.error(err);
		    } else {
		      convertData(result);
		    }
		});
	} catch(e) {
	  console.log("Could not parse wordpress data", e); 
	}
};


function convertData(wordpressData) {
	// console.log("wordpressData.rss.channel.item", wordpressData.rss.channel.item);
	var pages = [];
	var comments = [];
	var menus = [];

	var position = 0;

	var wordpressPages = wordpressData.rss.channel.item;
	for(var idx = 0; idx < wordpressPages.length; idx++) {
		var wpPage = wordpressPages[idx];
		var meanbasePage = {};

		meanbasePage.url = '/' + wpPage['wp:post_name'];
		meanbasePage.template = wpPage["wp:post_type"];
		meanbasePage.created = wpPage["wp:post_date"];
		meanbasePage.updated = wpPage["wp:post_date"];
		meanbasePage.author = wpPage["dc:creator"];
		meanbasePage.tabTitle = wpPage["title"];
		meanbasePage.published = (wpPage["pubDate"] !== "Mon, 30 Nov -0001 00:00:00 +0000")? true: false;
		meanbasePage.title = wpPage["title"];
		meanbasePage.content = [];
		meanbasePage.content.push({location: 'content-1', text: wpPage["content:encoded"]});
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

		if(meanbasePage.template !== "attachment") {
			var menu = {};
			menu.title = wpPage["title"];
			menu.url = '/' + wpPage['wp:post_name'];
			menu.group = 'main';
			menu.position = position++;
		}

		menus.push(menu);
		pages.push(meanbasePage);

	}

	CommentsModel.remove({}, function (err, foundComments) {
	  if(err) { return console.log('importing data err', err); }
	  // if(foundComments.length === 0) {
	  	CommentsModel.create(comments, function(err, foundComments2) {
  		  if(err) { return console.log('importing data err', err); }
  		  console.log('comments saved');
  		});
	  // }
	});

	PagesModel.remove({}, function (err, foundPages) {
	  if(err) { return console.log('importing data err', err); }
	  // if(foundPages.length === 0) {
	  	PagesModel.create(pages, function(err, foundPages2) {
  		  if(err) { return console.log('importing data err', err); }
  		  console.log('pages saved');
  		});
	  // }
	});

	MenusModel.remove({}, function (err, foundMenus) {
	  if(err) { return console.log('importing data err', err); }
	  // if(foundMenus.length === 0) {
	  	MenusModel.create(menus, function(err, foundMenus2) {
  		  if(err) { return console.log('importing data err', err); }
  		  console.log('menus saved');
  		});
	  // }
	});

	position = 0;
}