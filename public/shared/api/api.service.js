'use strict';

angular.module('meanbaseApp')
  .service('api', function (endpoints) {

    var api = {
      publishedPages: new endpoints('pages'),
      searchPages: new endpoints('pages'),
      searchPublishedPages: new endpoints('pages'),
      pages: new endpoints('pages'),
      approvedComments: new endpoints('comments'),
      comments: new endpoints('comments'),
      bannedMembers: new endpoints('bans'),
      publishedMenus: new endpoints('menus'),
      menus: new endpoints('menus'),
      sharedContent: new endpoints("shared-content"),
      extensions: new endpoints('extension'),
      themes: new endpoints('themes'),
      media: new endpoints('images'),
      settings: new endpoints('settings'),
      import: new endpoints('import'),
      developmentMode: new endpoints('development-mode'),
      roles: new endpoints('roles'),
      users: new endpoints('users')
    };

    return api;
  });
