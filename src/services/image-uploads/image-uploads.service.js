
export default class ImageUploadService {
  
  setup(app) {
    this.app = app;
  }

  create(data, params) {
    return new Promise((resolve, reject) => {
      const destination = params.file.destination.replace(this.app.get('clientPath'), '');

      data = {
        url: destination,
        filename: params.file.filename,
        galleries: data.galleries? [data.galleries]: []
      };

      this.app.service('images').create(data).then(function(found) {
        resolve(found);
      }).catch(function(err) {
        console.log("error uploading image", err);
        reject(err);
      });
    });
  }

}
