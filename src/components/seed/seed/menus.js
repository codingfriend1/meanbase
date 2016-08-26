var home = {
    "title": "Home",
    "url": "/",
    "position": 0,
    "group": "main"
};

var tutorial = {
	"title": "Tutorial",
	"url": "/tutorial",
	"position": 0
};

var login = {
	"title": "Login",
	"url": "/login",
	"group": "rightHand",
	"position": 1
};

var youtubeDemo = {
	"title": "Youtube Demo",
	"url": "https://www.youtube.com/watch?v=tteztXru4eA&feature=youtu.be",
	"group": "sidebar",
	"position": 0
};

var article = {
	"title": "Why a CMS?",
	"url": "/why-cms",
	"group": "main",
	"position": 2
};

var CMS = {
  "title": "CMS",
  "url": "/cms",
  "published": true,
  "target": "_self",
  "position": 4,
  "group": "main",
};

module.exports = [home, tutorial, login, youtubeDemo, article, CMS];
