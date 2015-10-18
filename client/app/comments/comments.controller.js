'use strict';

angular.module('meanbaseApp')
  .controller('CommentsCtrl', function ($scope, endpoints, helpers, toastr) {

    $scope.$parent.pageTitle = 'Moderate Comments';
    
    var comments = new endpoints('comments');
  	var settings = new endpoints('settings');

    $scope.autoAccept = false;
    $scope.autoReject = false;
    $scope.dateDirection = 'after';
    $scope.pagesWithComments = [{label:'all', value: ''}];
    $scope.filterByThisPage = '';
    $scope.commentDate = null;
  	comments.find({}).then(function(response) {
  		$scope.comments = response.data;

      for (var i = 0; i < $scope.comments.length; i++) {
        if($scope.pagesWithComments.indexOf($scope.comments[i].url) === -1) {
          $scope.pagesWithComments.push($scope.comments[i].url);
        }
      };
      $scope.pagesWithComments = helpers.generateSelectOptions($scope.pagesWithComments, function(page){
        return page.substring(1);
      });
  	});

    // Get the auto accept comments status
    settings.find({name: 'auto-accept-comments'}).then(function(response) {
      if(!response.data[0]) { return $scope.autoAccept = false; }
      $scope.autoAccept = response.data[0].value === "true";
    });

    settings.find({name: 'disable-comments'}).then(function(response) {
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
  		comments.update({_id: comment._id}, {approved: true}).then(function(response) {
  			$scope.comments[$scope.comments.indexOf(comment)].approved = true;
        toastr.clear();
        toastr.success('Comment approved.');
  		});
  	};

  	$scope.unapproveComment = function(comment, index) {
  		comments.update({_id: comment._id}, {approved: false}).then(function(response) {
  			$scope.comments[$scope.comments.indexOf(comment)].approved = false;
        toastr.clear();
        toastr.success('Comment unapproved.');
  		});
  	};

  	$scope.editComment = function(comment, index) {

  	};

  	$scope.deleteComment = function(comment) {
  		comments.delete({_id: comment._id}).then(function(response) {
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
        comments.delete({}).then(function() {
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
      comments.delete({}).then(function() {
        comments.create($scope.comments);
        toastr.clear();
        toastr.success('Approved all visible comments.');
      });
    }

    $scope.unapproveAllVisible = function() {
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        $scope.filteredComments[i].approved = false;
      }

      // Sync the database with the comments
      comments.delete({}).then(function() {
        comments.create($scope.comments);
        toastr.clear();
        toastr.success('Unapproved all visible comments.');
      });
    }

    $scope.toggleAutoAccept = function(boole) {
      settings.update({name: 'auto-accept-comments'}, {name: 'auto-accept-comments', value: boole}).then(function(response) {
        boole = boole;
      }, function() {
        boole = !boole;
      });
    };

    $scope.toggleDisableComments = function(boole) {
      console.log('hi');
      settings.update({name: 'disable-comments'}, {name: 'disable-comments', value: boole}).then(function(response) {
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
