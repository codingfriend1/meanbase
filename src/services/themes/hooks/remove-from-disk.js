import fse from 'fs-extra';
import path from 'path';

export default options => {
  return hook => {
    for (var i = 0; i < hook.result.length; i++) {
      const theme = hook.result[i];
      if(!hook.app.get('themesPath')) {
        return new Error('Sorry themesPath is missing');
      }
      const folderName = path.join(hook.app.get('themesPath'), theme.url || 'al23gl239');
      fse.remove(folderName);
    }
    return hook;
  }
}
