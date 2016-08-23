import { arrayToObjectWithObject, arrayToObjectWithArray } from '../../../components/utility';


var months = new Array();
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

function getFormattedDate(timestamp) {
    var date = new Date(timestamp);

    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    var ampm = (hour >= 12) ? "pm" : "am";

    hour = (hour % 12) || 12;

    var month = months[date.getMonth()];
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    var str = month + ' ' + day + ', ' + date.getFullYear() + " at " + hour + ":" + min + ampm;

    /*alert(str);*/

    return str;
}

export default options => {
  return hook => {
    if(!hook.result) { return hook; }
    if(!hook.params.provider && !hook.params.forceCall) { return hook; }

    if(Array.isArray(hook.result)) {
      for (var i = 0; i < hook.result.length; i++) {
        let page = hook.result[i];
        page.images = arrayToObjectWithObject(page.images, 'location');
        page.extensions = arrayToObjectWithArray(page.extensions, 'group');
        if(!page.extensions) {
          page.extensions = {};
        }

        if(page.createdAt) {
          page.createdAt = getFormattedDate(page.createdAt)
        }
        if(page.createdAt) {
          page.updatedAt = getFormattedDate(page.updatedAt)
        }
      }
    } else {
      hook.result.images = arrayToObjectWithObject(hook.result.images, 'location');
      hook.result.extensions = arrayToObjectWithArray(hook.result.extensions, 'group');
      if(!hook.result.extensions) {
        hook.result.extensions = {};
      }

      if(hook.result.createdAt) {
        hook.result.createdAt = getFormattedDate(page.createdAt)
      }
      if(hook.result.createdAt) {
        hook.result.updatedAt = getFormattedDate(page.updatedAt)
      }
    }

    return hook;
  }
}
