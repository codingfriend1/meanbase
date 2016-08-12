'use strict';

angular.module('meanbaseApp')
  .controller('CommentsCtrl', function ($scope, endpoints, helpers, toastr, api, crud, $rootScope) {

    $scope.$parent.pageTitle = 'Comments';
    $scope.autoAccept = false;
    $scope.autoReject = false;
    $scope.dateDirection = 'after';
    $scope.pagesWithComments = [{label:'all', value: ''}];
    $scope.filterByThisPage = '';
    $scope.commentDate = null;

    $scope.$parent.tabs = [
      {title: "Comments", id: '#moderate-comments', active: true},
      {title: "Banned Commentors", id: '#banned-commentors', active: false}
    ];

    $scope.c = new crud($scope, 'comments', api.comments);

  	$scope.c.find({}).then(function(response) {
      api.bannedMembers.find({}).then(function(bannedComments) {
        $scope.bannedMembers = bannedComments;
        for (var i = 0; i < $scope.comments.length; i++) {
          if($scope.pagesWithComments.indexOf($scope.comments[i].url) === -1) {
            $scope.pagesWithComments.push($scope.comments[i].url);
          }
          for (var j = 0; j < bannedComments.length; j++) {
            if(bannedComments[j].email === $scope.comments[i].email || bannedComments[j].ip === $scope.comments[i].ip) {
              $scope.comments[i].banned = true;
            }
          }
        }
        $scope.pagesWithComments = helpers.generateSelectOptions($scope.pagesWithComments, function(page){
          return page.substring(1);
        });
      }).catch(function(err) {
         toastr.warning('Could not figure out if comments are banned.')
      });

  	});

    var autoAcceptCommentsExists = false

    // Get the auto accept comments status
    api.settings.find({name: 'auto-accept-comments'}).then(function(response) {
      if(response.length > 0) { autoAcceptCommentsExists = true; }
      if(!response[0]) { return $scope.autoAccept = false; }
      $scope.autoAccept = response[0].value;
    });

    var disableCommentsExists = false;

    api.settings.find({name: 'disable-comments'}).then(function(response) {
      if(response.length > 0) { disableCommentsExists = true; }
      if(!response || response.length === 0) { return $scope.disableComments = false; }
      $scope.disableComments = response[0].value;
    });

    $scope.approvalStates = [
      {label: 'both', value: ''},
      {label: 'approved', value: 'true'},
      {label: 'unapproved', value: 'false'}
    ];

    $scope.approval = '';

    $scope.today = new Date();

    $scope.dateOpened = false;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.dateOpened = true;
    };

  	$scope.commentFilter = function(comment) {
  		return (comment.content + comment.author + comment.ip + comment.email + comment.date + comment.url).toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
  	};

    $scope.toggleApproved = function(comment) {
      comment.approved = !comment.approved
      var message = comment.approved? comment.url + ' approved.': comment.url + ' unapproved.';
      var failure = comment.approved? 'Could not publish ' + comment.url: 'Could not unpublish ' + comment.url;

      $scope.c.update(comment, {approved: comment.approved}, message, failure);
    };

  	$scope.editComment = function(comment, index) {

  	};

    $scope.saveSettings = function(comment, settings) {
      if(comment && comment._id) {
        $scope.c.update(comment, settings, comment.email + ' updated', 'Could not update ' + comment.email);
      }

      $scope.c.toggleModal('isSettingsOpen', 'settings');
  	};

    $scope.ban = function(comment) {
      if(!comment || !comment.email || !comment.ip) { return false; }
      api.bannedMembers.create({email: comment.email, ip: comment.ip}).then(function(response) {
        toastr.success('Commentor banned');
        comment.banned = true;
        $scope.bannedMembers.push(response[0]);
      }).catch(function(err) {
        toastr.danger('Could not ban commentor', err);
      });
    };

    $scope.unban = function(item) {
      if(!item || !item.email || !item.ip) { return false; }
      api.bannedMembers.delete({ $or: [ {email: item.email}, {ip: item.ip} ] }).then(function(response) {
        toastr.clear();
        toastr.success('Commentor unbanned');
        var index = $scope.bannedMembers.indexOf(item);
        if(index > -1) {
          $scope.bannedMembers.splice(index, 1);
        }
        if(item.date) {
          item.banned = false;
        } else {
          for (var i = 0; i < $scope.comments.length; i++) {
            if($scope.comments[i].email === item.email || $scope.comments[i].ip === item.ip) {
              $scope.comments[i].banned = false;
            }
          }
        }
      }, function(err) {
        toastr.danger('Could not unban commentor', err);
      });
    };

  	$scope.deleteComment = function(comment) {
  		api.comments.delete({_id: comment._id}).then(function(response) {
  			$scope.comments.splice($scope.comments.indexOf(comment), 1);
        toastr.clear();
        toastr.success('Comment deleted.');
        $scope.c.toggleModal('isDeleteOpen', 'commentToDelete')
  		});
  	};

    $scope.deleteAllVisible = function() {
      if(!$scope.filteredComments || $scope.filteredComments.length === 0) { return false; }
      var confirm = window.confirm('Are you sure you want to delete so many?');
      if(confirm) {
        for(var i = 0; i < $scope.filteredComments.length; i++) {
          if($scope.comments.indexOf($scope.filteredComments[i]) > -1) {
            $scope.comments.splice($scope.comments.indexOf($scope.filteredComments[i]), 1);
          }
        }

        // Sync the database with the comments
        api.comments.delete({}).then(function() {
          toastr.clear();
          toastr.success('Deleted all comments.');
        });
      }
    }

    $scope.approveAllVisible = function() {
      var ids = [];
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        $scope.filteredComments[i].approved = true;
        ids.push($scope.filteredComments[i]._id);
      }

      api.comments.update({_id: {$in: ids}}, {approved: true}).then(function(response) {
        for(var i = 0; i < $scope.comments.length; i++) {
          if(ids.indexOf($scope.comments[i]._id) > -1) {
            $scope.comments[i].approved = true;
          }
        }
        toastr.clear();
        toastr.success('Approved all visible comments.');
      }, function(err) {
        toastr.clear();
        toastr.warning('Sorry but those comments could not all be approved.');
      });
    }

    $scope.unapproveAllVisible = function() {
      var ids = [];
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        ids.push($scope.filteredComments[i]._id);
      }

      api.comments.update({_id: {$in: ids}}, {approved: false}).then(function(response) {
        for(var i = 0; i < $scope.comments.length; i++) {
          if(ids.indexOf($scope.comments[i]._id) > -1) {
            $scope.comments[i].approved = false;
          }
        }
        toastr.clear();
        toastr.success('Approved all visible comments.');
      }, function(err) {
        toastr.clear();
        toastr.warning('Sorry but those comments could not all be approved.');
      });
    }

    $scope.toggleAutoAccept = function(boole) {
      var promise;
      if(autoAcceptCommentsExists) {
        promise = api.settings.update({name: 'auto-accept-comments'}, {name: 'auto-accept-comments', value: boole});
      } else {
        promise = api.settings.create({name: 'auto-accept-comments', value: boole});
      }

      promise.then(function(response) {
        autoAcceptCommentsExists = true;
        boole = boole;
      }, function(err) {
        boole = !boole;
      });
    };

    $scope.toggleDisableComments = function(boole) {
      var message = boole? 'Comments are disabled on the site.': 'Comments are enabled on the site.'
      var promise;
      if(disableCommentsExists) {
        promise = api.settings.update({name: 'disable-comments'}, {value: boole});
      } else {
        promise = api.settings.create({name: 'disable-comments', value: boole});
      }
      promise.then(function(response) {
        toastr.success(message);
        disableCommentsExists = true;
        boole = boole;
      }).catch(function() {
        toastr.warning('Sorry, something went wrong on the server and we could not enable or disable comments.');
        boole = !boole;
      });
    };

    $scope.$on('$destroy', function() {
      $scope.$parent.tabs = null;
      componentHandler.upgradeAllRegistered()
    });

  });

angular.module('meanbaseApp').filter('removeSlash', function() {
  return function(input) {
    return input.substring(1);
  };
});

angular.module('meanbaseApp').filter('dateRange', function(){
  return function(items, field, date, days, dateDirection){
    if(!date || date === '') { return items; }
    if(!items) { return items; }
    var timeEnd, timeStart;
    if(dateDirection === 'during') {
      timeStart = new Date(date);
      timeStart = Date.parse(timeStart);
      timeEnd = timeStart + (days * 86400000); // 1 day in ms

      return items.filter(function(item){
        var itemDate = Date.parse(item[field]);
        return (itemDate > timeStart && itemDate < timeEnd);
      });
    } else if(dateDirection === 'before') {
      timeStart = new Date(date);
      timeStart = Date.parse(timeStart);

      return items.filter(function(item){
        var itemDate = Date.parse(item[field]);
        return (itemDate < timeStart);
      });
    } else if(dateDirection === 'after') {
      timeStart = new Date(date);
      timeStart = Date.parse(timeStart);

      return items.filter(function(item){
        var itemDate = Date.parse(item[field]);
        return (itemDate > timeStart);
      });
    }

  };
});
