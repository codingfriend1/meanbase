'use strict';

angular.module('meanbaseApp')
  .controller('CommentsCtrl', function ($scope, endpoints, helpers, toastr, apiconfig) {

    $scope.$parent.pageTitle = 'Moderate Comments';

    $scope.autoAccept = false;
    $scope.autoReject = false;
    $scope.dateDirection = 'after';
    $scope.pagesWithComments = [{label:'all', value: ''}];
    $scope.filterByThisPage = '';
    $scope.commentDate = null;
  	apiconfig.comments.find({}).then(function(response) {
  		$scope.comments = response.data;

      apiconfig.bannedMembers.find({}).success(function(bannedComments) {
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
      }).error(function(err) {
         toastr.warning('Could not figure out if comments are banned.')
      });

  	});

    // Get the auto accept comments status
    apiconfig.settings.find({name: 'auto-accept-comments'}).then(function(response) {
      if(!response.data[0]) { return $scope.autoAccept = false; }
      $scope.autoAccept = response.data[0].value === "true";
    });

    apiconfig.settings.find({name: 'disable-comments'}).then(function(response) {
      if(!response.data[0]) { return $scope.disableComments = false; }
      $scope.disableComments = response.data[0].value === "true";
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


  	$scope.commentFilter = '';
  	$scope.filterComments = function(comment) {
  		return (comment.content + comment.author + comment.ip + comment.email + comment.date + comment.url).toLowerCase().indexOf($scope.commentFilter.toLowerCase()) >= 0;
  	};

  	$scope.approveComment = function(comment, index) {
  		apiconfig.comments.update({_id: comment._id}, {approved: true}).then(function(response) {
  			$scope.comments[$scope.comments.indexOf(comment)].approved = true;
        toastr.clear();
        toastr.success('Comment approved.');
  		});
  	};

  	$scope.unapproveComment = function(comment, index) {
  		apiconfig.comments.update({_id: comment._id}, {approved: false}).then(function(response) {
  			$scope.comments[$scope.comments.indexOf(comment)].approved = false;
        toastr.clear();
        toastr.success('Comment unapproved.');
  		});
  	};

  	$scope.editComment = function(comment, index) {

  	};

    $scope.ban = function(comment) {
      if(!comment || !comment.email || !comment.ip) { return false; }
      apiconfig.bannedMembers.create({email: comment.email, ip: comment.ip}).success(function(response) {
        toastr.success('Commentor banned');
        comment.banned = true;
        $scope.bannedMembers.push(response[0]);
      }).error(function(err) {
        toastr.danger('Could not ban commentor', err);
      });
    };

    $scope.unban = function(item) {
      if(!item || !item.email || !item.ip) { return false; }
      apiconfig.bannedMembers.delete({ $or: [ {email: item.email}, {ip: item.ip} ] }).then(function(response) {
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
  		apiconfig.comments.delete({_id: comment._id}).then(function(response) {
  			$scope.comments.splice($scope.comments.indexOf(comment), 1);
        toastr.clear();
        toastr.success('Comment deleted.');
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
        apiconfig.comments.delete({}).then(function() {
          toastr.clear();
          toastr.success('Deleted all comments.');
        });
      }
    }

    $scope.approveAllVisible = function() {
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        $scope.filteredComments[i].approved = true;
      }

      // Sync the database with the comments
      apiconfig.comments.delete({}).then(function() {
        apiconfig.comments.create($scope.comments);
        toastr.clear();
        toastr.success('Approved all visible comments.');
      });
    }

    $scope.unapproveAllVisible = function() {
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        $scope.filteredComments[i].approved = false;
      }

      // Sync the database with the comments
      apiconfig.comments.delete({}).then(function() {
        apiconfig.comments.create($scope.comments);
        toastr.clear();
        toastr.success('Unapproved all visible comments.');
      });
    }

    $scope.toggleAutoAccept = function(boole) {
      apiconfig.settings.update({name: 'auto-accept-comments'}, {name: 'auto-accept-comments', value: boole}).then(function(response) {
        boole = boole;
      }, function() {
        boole = !boole;
      });
    };

    $scope.toggleDisableComments = function(boole) {
      apiconfig.settings.update({name: 'disable-comments'}, {name: 'disable-comments', value: boole}).then(function(response) {
        boole = boole;
      }, function() {
        boole = !boole;
      });
    };

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
