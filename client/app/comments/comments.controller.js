'use strict';

angular.module('meanbaseApp')
  .controller('CommentsCtrl', function ($scope, endpoints) {
  	var comments = new endpoints('comments');

  	comments.find({}).then(function(response) {
  		$scope.comments = response.data;
  	});


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
