// var demoHome = {
//   "author": "Admin",
//   "visibility": "basic",
//   "url": "/",
//   "tabTitle": "meanbase",
//   "template": "home",
//   "title": "meanbase",
//   "content": {
//     "content-1": "Meanbase is a CMS built on the MEAN stack and made to be simple and intuitive for users and developers.",
//     "content-2": "<h3>Simple</h3><p>Meanbase is designed from the ground up to be simple for an average user to learn so you can hand over your product for them to update without stress and training.</p>",
//     "content-3": "<h3>Fast</h3><p>Meanbase CMS runs off of the MEAN stack: Mongo, Express, Angular, and Node meaning it's generally faster than other web technologies so you don't have to wait for every page to refresh when making edits.</p>",
//     "content-4": "<h3>Developer Friendly</h3><p>Meanbase is also focused on making the process of creating themes, modifying the CMS, and adding extensions&nbsp;delightful for developers who have to interact with the code every day. It's provides you control and simplicity so you can spend more time focusing on what matters.</p>"
//   },
//   "description": "A demo home page created automatically in meanbase.",
//   "summary": "A demo home page created automatically in meanbase.",
//   "published": true
// };

var home = {
  "editability": "admin",
  "url": "/",
  "tabTitle": "",
  "template": "home",
  "summary": "Meanbase is a CMS for the MEAN stack",
  "description": "Meanbase is a CMS for the MEAN stack",
  "published": true,
  "links": {
    "callToAction": {
      "icon": {
        "classes": "fa fa-pencil fa-lg example"
      },
      "title": ""
    }
  },
  "lists": {
    "body1": [{
      "group": "body1",
      "position": 0,
      "label": "md bullet point list",
      "html": "<div class=\"content-section-a\">\n  <div class=\"container\">\n    <div class=\"row\" ng-init=\"point={}\" ng-sortable=\"mbSortableExtensionList\">\n      <div class=\"col-lg-4 col-sm-4 mb-animate-list relative\" mb-grid-item item=\"point\" ng-repeat=\"point in listItem.data.items\" ng-class=\"{'mb-inner-draggable': $root.editMode}\">\n        <a mb-link=\"link\" belongs-to=\"point\" style=\"text-decoration: none\">\n          <div class=\"text-center\">\n            <mb-choose-icon belongs-to=\"point\" property=\"icon\" class=\"margin-bottom-1\"></mb-choose-icon>\n            <mb-choose-image property=\"image\" belongs-to=\"point\">\n              <img mb-src=\"image\" belongs-to=\"point\" class=\"img-responsive\"/>\n            </mb-choose-image>\n            <div mb-edit ng-model=\"point.title\" bind-options=\"editorSingleLine\"></div>\n            <div mb-edit ng-model=\"point.description\" bind-options=\"editorOptions\"></div>\n            <mb-edit-link belongs-to=\"point\" property=\"link\"></mb-edit-link>\n            <!-- <mb-list-remove list=\"listItem.data.items\" item=\"point\"></mb-list-remove> -->\n          </div>\n        </a>\n      </div>\n      <mb-list-add class=\"col-lg-4 col-sm-4 text-center relative\" mb-grid-item item=\"point\" ng-if=\"editMode\" list=\"listItem.data.items\" label=\"bullet point\"></mb-list-add>\n    </div>\n  </div>\n</div>\n",
      "sync": true,
      "syncGroup": "main",
      "data": {
        "items": [{
          "gridClasses": "col-lg-4 col-sm-4 text-center relative   ui-resizable mb-inner-draggable",
          "icon": {
            "classes": "fa fa-smile-o fa-lg"
          },
          "link": {},
          "title": "<h3 class=\"ng-scope\">Simple</h3>",
          "description": "<p class=\"medium-insert-active ng-scope\"><br></p><div class=\"medium-insert-buttons ng-scope\" contenteditable=\"false\" style=\"left: 15px; top: 300.5px; display: none;\">\n    <button class=\"medium-insert-buttons-show\" type=\"button\"><span>+</span></button>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n            <li><button data-addon=\"images\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-camera\"></span></button></li>\n            <li><button data-addon=\"embeds\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-youtube-play\"></span></button></li>\n    </ul>\n</div>"
        }, {
          "gridClasses": "col-lg-4 col-sm-4 text-center relative   ui-resizable mb-inner-draggable",
          "icon": {
            "classes": "fa fa-clock-o fa-lg"
          },
          "link": {},
          "title": "<h3 class=\"ng-scope\">Fast</h3>",
          "description": ""
        }, {
          "gridClasses": "col-lg-4 col-sm-4 text-center relative   ui-resizable mb-inner-draggable",
          "icon": {
            "classes": "fa fa-laptop fa-lg"
          },
          "link": {},
          "title": "<h3 class=\"ng-scope\">Developer Friendly</h3>",
          "description": ""
        }]
      }
    }, {
      "group": "body1",
      "position": 0,
      "label": "md selling point list",
      "html": "<selling-point-list></selling-point-list>\n",
      "sync": true,
      "syncGroup": "main",
      "data": {
        "items": [{
          "title": "<h1 class=\"ng-scope\">Simple</h1>",
          "text": "<p class=\"ng-scope\">Meanbase is designed from the ground up to be simple for an average user to learn so you can hand over your product for them to update without stress and training.<br></p><div class=\"medium-insert-buttons ng-scope\" contenteditable=\"false\" style=\"left: 15px; top: 132px; display: none;\">\n    <button class=\"medium-insert-buttons-show\" type=\"button\"><span>+</span></button>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n            <li><button data-addon=\"images\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-camera\"></span></button></li>\n            <li><button data-addon=\"embeds\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-youtube-play\"></span></button></li>\n    </ul>\n</div>"
        }, {
          "left": true,
          "title": "<h1 class=\"ng-scope\">Fast</h1>",
          "text": "<p class=\"ng-scope\">Meanbase CMS runs off of the MEAN stack: Mongo, Express, Angular, and Node meaning it's generally faster than wordpress so you don't have to wait for every page to refresh when making edits.<br></p><div class=\"medium-insert-buttons ng-scope\" contenteditable=\"false\" style=\"left: 15px; top: 103px; display: none;\">\n    <button class=\"medium-insert-buttons-show\" type=\"button\"><span>+</span></button>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n            <li><button data-addon=\"images\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-camera\"></span></button></li>\n            <li><button data-addon=\"embeds\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-youtube-play\"></span></button></li>\n    </ul>\n</div>"
        }, {
          "title": "<h1>Developer Friendly</h1>",
          "text": "<p class=\"\">Meanbase is also focused on making the process of creating themes and adding extensions delightful for developers who have to interact with the code every day. It's provides you control and simplicity so you can spend more time focusing on what matters.<br></p><div class=\"medium-insert-buttons\" contenteditable=\"false\" style=\"left: 15px; top: 132px; display: none;\">\n    <button class=\"medium-insert-buttons-show\" type=\"button\"><span>+</span></button>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n            <li><button data-addon=\"images\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-camera\"></span></button></li>\n            <li><button data-addon=\"embeds\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-youtube-play\"></span></button></li>\n    </ul>\n</div>"
        }]
      }
    }],
    "header1": [{
      "group": "header1",
      "position": 0,
      "label": "mb buttons list",
      "html": "<div>\n  <ul class=\"list-inline intro-social-buttons\" ng-sortable=\"mbSortableExtensionList\">\n    <li ng-repeat=\"socialBtn in listItem.data.items\" class=\"relative\" ng-class=\"{'mb-inner-draggable': $root.editMode}\">\n      <mb-choose-link belongs-to=\"socialBtn\" property=\"link\">\n        <a class=\"btn btn-default\" mb-link=\"link\" belongs-to=\"socialBtn\">\n          <mb-choose-icon belongs-to=\"socialBtn\" property=\"icon\"></mb-choose-icon>\n          <span mb-edit ng-model=\"socialBtn.title\" bind-options=\"editorSingleLine\"></span>\n        </a>\n      </mb-choose-link>\n    </li>\n    <li mb-list-add list=\"listItem.data.items\" item=\"socialBtn\" label=\"button\" class=\"text-center relative ignore-inner-draggable\" ng-if=\"editMode\" ng-init=\"socialBtn = {}\">\n    </li>\n  </ul>\n</div>\n",
      "sync": true,
      "syncGroup": "main",
      "data": {
        "items": [{
          "icon": {
            "classes": "fa fa-github"
          },
          "link": {
            "url": "https://github.com/codingfriend1/meanbase",
            "classes": "btn-lg",
            "target": "_blank"
          },
          "title": "Github"
        }]
      }
    }],
    "footer1": [{
      "group": "footer1",
      "position": 0,
      "label": "mb buttons list",
      "html": "<div>\n  <ul class=\"list-inline intro-social-buttons\" ng-sortable=\"mbSortableExtensionList\">\n    <li ng-repeat=\"socialBtn in listItem.data.items\" class=\"relative\" ng-class=\"{'mb-inner-draggable': $root.editMode}\">\n      <mb-choose-link belongs-to=\"socialBtn\" property=\"link\">\n        <a class=\"btn btn-default\" mb-link=\"link\" belongs-to=\"socialBtn\">\n          <mb-choose-icon belongs-to=\"socialBtn\" property=\"icon\"></mb-choose-icon>\n          <span mb-edit ng-model=\"socialBtn.title\" bind-options=\"editorSingleLine\"></span>\n        </a>\n      </mb-choose-link>\n    </li>\n    <li mb-list-add list=\"listItem.data.items\" item=\"socialBtn\" label=\"button\" class=\"text-center relative ignore-inner-draggable\" ng-if=\"editMode\" ng-init=\"socialBtn = {}\">\n    </li>\n  </ul>\n</div>\n",
      "sync": true,
      "syncGroup": "main",
      "data": {
        "items": [{
          "icon": {
            "classes": "fa fa-github"
          },
          "link": {
            "url": "https://github.com/codingfriend1/meanbase",
            "classes": "btn-lg",
            "target": "_blank"
          },
          "title": "Github"
        }]
      }
    }]
  },
  "title": "<h1>Meanbase</h1>",
  "visibility": "admin",
  "content": {
    "prefooter1": "<h2>Checkout meanbase</h2>",
    "footer1": "<p>meanbase is MIT license</p>"
  }
}

var tutorial = {
  "author": "Admin",
  "visibility": "basic",
  "url": "/tutorial",
  "tabTitle": "meanbase - tutorial",
  "template": "page",
  "title": "Tutorial",
  "content": {
    "body1": "Create your themes in client/themes/ folder. Use generator-angular-fullstack to understand project structure. "
  },
  "description": "A tutorial to get you running with meanbase.",
  "summary": "A tutorial to get you running with meanbase.",
  "published": false
};

var article = {
  "author": "Admin",
  "visibility": "basic",
  "url": "/why-cms",
  "tabTitle": "Why a CMS?",
  "template": "article",
  "title": "Why use a CMS",
  "content": {
    "body1": "<p class=\"ng-scope\">A CMS allows you to put control of the website into a user's hands so you don't have to be called everytime they need to make small changes. It means you can focus on the fun things like building themes and extensions while your customers can write the content themselves.<br></p><div class=\"medium-insert-buttons ng-scope\" contenteditable=\"false\" style=\"display: none\">\n    <button class=\"medium-insert-buttons-show\" type=\"button\"><span>+</span></button>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n            <li><button data-addon=\"images\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-camera\"></span></button></li>\n            <li><button data-addon=\"embeds\" data-action=\"add\" class=\"medium-insert-action\" type=\"button\"><span class=\"fa fa-youtube-play\"></span></button></li>\n    </ul>\n</div>",
    "body2": "Leave a Comment",
    "body3": "Comments",
    "footer1": "meanbase is MIT license"
  },
  // "content": {
  //   "content-1": "A CMS allows you to put control of the website into a user's hands so you don't have to be called everytime they need to make small changes. It means you can focus on the fun things like building themes and extensions while your customers can write the content themselves."
  // },
  "lists": {
    "footer1": {
      "items": [
        {
          "icon": {
            "classes": "fa fa-github",
            "url": "https://github.com/codingfriend1/meanbase-1.0.0",
            "target": "_blank"
          },
          "link": {}
        }
      ]
    }
  },
  "description": "Why do we need a CMS?",
  "summary": "A reason to use a CMS",
  "published": true
};

module.exports = [home];
