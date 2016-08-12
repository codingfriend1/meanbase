import fse from 'fs-extra';
import path from 'path';

export default options => {
  return hook => {
    for (var i = 0; i < hook.result.length; i++) {
      const image = hook.result[i];
      const folderName = path.join(hook.app.get('clientPath'), image.url || 'al23gl239');
      fse.remove(folderName);
    }
  }
}
