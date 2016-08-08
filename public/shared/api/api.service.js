'use strict';

angular.module('meanbaseApp')
  .service('api', function (endpoints) {

    var api = {
      publishedPages: new endpoints('pages/published'),
      searchPages: new endpoints('pages/search'),
      searchPublishedPages: new endpoints('pages/published/search'),
      pages: new endpoints('pages'),
      approvedComments: new endpoints('comments/approved'),
      comments: new endpoints('comments'),
      bannedMembers: new endpoints('comments/ban'),
      publishedMenus: new endpoints('menus/published'),
      menus: new endpoints('menus'),
      sharedContent: new endpoints("shared-content"),
      extensions: new endpoints('extension'),
      themes: new endpoints('themes'),
      media: new endpoints('media'),
      settings: new endpoints('settings'),
      import: new endpoints('import'),
      developmentMode: new endpoints('development-mode'),
      roles: new endpoints('roles'),
      users: new endpoints('users')
    };

    return api;
  });
