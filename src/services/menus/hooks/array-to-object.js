export default options => {
  return hook => {

    if(!hook.params.provider && !hook.params.forceCall) { return hook; }

    if(hook.result && Array.isArray(hook.result) && hook.result.length > 0) {
      let allMenus = [].concat(hook.result), menus = {}, i = 0;
      while(i < allMenus.length) {
    	  if(menus[allMenus[i].group] === undefined) {
    	    menus[allMenus[i].group] = [];
    	  }
    	  menus[allMenus[i].group].push(allMenus[i]);
    	  i++;
    	}
      hook.result = menus;
    }
  }
}
