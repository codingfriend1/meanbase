(function(){
	angular.module('meanbaseApp').factory('endpoints', ['$http', function($http) {

		function endpoints(endpoint) {
			this.baseRoute = '/api/';
			this.endpoint = endpoint;
		}

		endpoints.prototype.create = function(data) {
			return $http.post(this.baseRoute + this.endpoint, data).error(function(error) {
				this.errorHandler(error);
			});
		};

		endpoints.prototype.find = function(identifier) {
			return $http.get(this.baseRoute + this.endpoint, {params: identifier}).error(function(error) {
				this.errorHandler(error);
			});
		};

		endpoints.prototype.update = function(identifier, replacementData) {
			return $http.put(this.baseRoute + this.endpoint, {identifier: identifier, replacementData: replacementData}).error(function(error) {
				this.errorHandler(error);
			});
		};

		endpoints.prototype.delete = function(identifier) {
			return $http.delete(this.baseRoute + this.endpoint, {
			    params: identifier,
			    headers: {"Content-Type": "application/json;charset=utf-8"}
  			}).error(function(error) {
				this.errorHandler(error);
			});
		};

		endpoints.prototype.errorHandler = function(error) {
			console.log('api request error: ', error);
		};

		return endpoints;
	}]);
})();
