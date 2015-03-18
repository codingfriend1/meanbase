(function(){
	angular.module('meanbaseApp').factory('endpoints', ['$http', function($http) {

		function endpoints(endpoint) {

			this.baseRoute = '/api/';
			
			this.create = function(data) {
				return $http.post(this.baseRoute + endpoint, data).error(function(error) {
					this.errorHandler(error);
				});
			};

			this.read = function(identifier) {
				return $http.get(this.baseRoute + endpoint, {params: identifier}).error(function(error) {
					this.errorHandler(error);
				});
			};

			this.update = function(identifier, replacementData) {
				return $http.put(this.baseRoute + endpoint, {identifier: identifier, replacementData: replacementData}).error(function(error) {
					this.errorHandler(error);
				});
			};

			this.delete = function(identifier) {
				return $http.delete(this.baseRoute + endpoint, {
				    params: identifier,
				    headers: {"Content-Type": "application/json;charset=utf-8"}
	  			}).error(function(error) {
					this.errorHandler(error);
				});
			};

			this.errorHandler = function(error) {
				console.log('api request error: ', error);
			};
		}
		return endpoints;
	}]);
})();
