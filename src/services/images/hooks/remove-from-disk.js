import fse from 'fs-extra';
import path from 'path';

export default options => {
  return hook => {
    for (var i = 0; i < hook.result.length; i++) {
      const image = hook.result[i];
      if(!hook.app.get('clientPath')) {
        return new Error('Sorry client path is missing');
      }
      const folderName = path.join(hook.app.get('clientPath'), image.url || 'al23gl239');
      fse.remove(folderName);
    }
    return hook;
  }
}
