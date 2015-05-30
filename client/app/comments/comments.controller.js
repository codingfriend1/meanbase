'use strict';

angular.module('meanbaseApp')
  .controller('CommentsCtrl', function ($scope, endpoints, helpers) {

    $scope.$parent.pageTitle = 'Moderate Comments';
    
  	var comments = new endpoints('comments');

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
  			$scope.comments[index].approved = true;
  		});
  	};

  	$scope.unapproveComment = function(comment, index) {
  		comments.update({_id: comment._id}, {approved: false}).then(function(response) {
  			$scope.comments[index].approved = false;
  		});
  	};

  	$scope.editComment = function(comment, index) {

  	};

  	$scope.deleteComment = function(comment, index) {
  		comments.delete({_id: comment._id}).then(function(response) {
  			$scope.comments.splice(index, 1);
  		});
  	};

    $scope.deleteAllVisible = function() {
      var confirm = window.confirm('Are you sure you want to delete so many?');
      if(confirm) {
        for(var i = 0; i < $scope.filteredComments.length; i++) {
          if($scope.comments.indexOf($scope.filteredComments[i]) > -1) {
            $scope.comments.splice($scope.comments.indexOf($scope.filteredComments[i]), 1);
          }
        }

        // Sync the database with the comments
        comments.delete({}).then(function() {
          comments.create($scope.comments);
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
      });
    }

    $scope.unapproveAllVisible = function() {
      for(var i = 0; i < $scope.filteredComments.length; i++) {
        $scope.filteredComments[i].approved = false;
      }

      // Sync the database with the comments
      comments.delete({}).then(function() {
        comments.create($scope.comments);
      });
    }
  });

angular.module('meanbaseApp').filter('removeSlash', function() {
  return function(input) {
    return input.substring(1);
  };
});

angular.module('meanbaseApp').filter('dateRange', function(){
  return function(items, field, date, days){
    if(!date || date === '') { return items; }
    if(!items) { return items; }
    
    var timeStart = new Date(date);
    timeStart = Date.parse(timeStart);
    var timeEnd = timeStart + (days * 86400000); // 1 day in ms
    return items.filter(function(item){
      var itemDate = Date.parse(item[field]);
      return (itemDate > timeStart && itemDate < timeEnd);
      
    });
  };
});
