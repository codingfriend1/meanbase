(function(){
	angular.module('meanbaseApp').factory('endpoints', ['$http', function($http) {

		function endpoints(endpoint) {
			this.baseRoute = '/api/';
			this.endpoint = endpoint;
		}

		endpoints.prototype.create = function(data) {
			var self = this;
			return $http.post(this.baseRoute + this.endpoint, data).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.find = function(identifier) {
			var self = this;
			return $http.get(this.baseRoute + this.endpoint, {params: identifier}).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.update = function(identifier, replacement) {
			var self = this;
			return $http.put(this.baseRoute + this.endpoint, {identifier: identifier, replacement: replacement}).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.delete = function(identifier) {
			var self = this;
			return $http.delete(this.baseRoute + this.endpoint, {
			    params: identifier,
			    headers: {"Content-Type": "application/json;charset=utf-8"}
  			}).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.findOne = function(id) {
			var self = this;
			return $http.get(this.baseRoute + this.endpoint + '/' + id).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.updateOne = function(id, replacement) {
			var self = this;
			return $http.put(this.baseRoute + this.endpoint + '/' + id, replacement).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.deleteOne = function(id) {
			var self = this;
			return $http.delete(this.baseRoute + this.endpoint + '/' + id).error(function(error) {
				self.errorHandler(error);
			});
		};

		endpoints.prototype.errorHandler = function(error) {
			console.log('api request error: ', error);
		};

		return endpoints;
	}]);
})();
