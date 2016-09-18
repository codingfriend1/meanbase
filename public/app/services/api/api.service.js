window.api = {
  custom: new endpoints('custom'),
  pages: new endpoints('pages'),
  comments: new endpoints('comments'),
  bans: new endpoints('bans'),
  menus: new endpoints('menus'),
  extensions: new endpoints('extensions'),
  themes: new endpoints('themes'),
  media: new endpoints('images'),
  settings: new endpoints('settings'),
  "import": new endpoints('import'),
  roles: new endpoints('roles'),
  users: new endpoints('users'),
  staging: new endpoints('staging'),
  importExport: new endpoints('import-export'),
  subscribe: new endpoints('subscribe')
};

export default window.api
