(function(){
	angular.module('meanbaseApp').factory('endpoints', function($http, toastr) {

		function endpoints(endpoint) {
			this.endpoint = endpoint || '';

			// If the url is a full address then don't modify it
			if(endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
				this.url = endpoint;
			} else {
				// else prefix it with /api/ so it calls our server api
				this.url = '/api/' + this.endpoint;
			}
		}

		endpoints.prototype.create = function(content) {
			var self = this;
			return $http.post(this.url, content).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.find = function(identifier) {
			var self = this;
			return $http.get(this.url, {params: {where: identifier} }).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.update = function(identifier, replacement) {
			var self = this;
			return $http.put(this.url, {identifier: identifier, replacement: replacement}).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.delete = function(identifier) {
			var self = this;
			return $http.delete(this.url, {
			    params: {where: identifier},
			    headers: {"Content-Type": "application/json;charset=utf-8"}
  			}).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.findOne = function(id) {
			var self = this;
			return $http.get(this.url + '/' + id).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.updateOne = function(id, replacement) {
			var self = this;
			return $http.put(this.url + '/' + id, replacement).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.deleteOne = function(id) {
			var self = this;
			return $http.delete(this.url + '/' + id).error(function(data, status, headers, config) {
				self.errorHandler(data, status, headers, config);
			});
		};

		endpoints.prototype.errorHandler = function(data, status, headers, config) {
			var category = this.endpoint;
			// if(category.substring(category.length-1) !== "s") {
			// 	category = category + 's';
			// }
			if(!/<[a-z][\s\S]*>/i.test(data)) {
				console.log('Server API call to "' + category + '" failed. ', data);
				var response = '';
				if(data.message && data.message === 'Validation failed') {
					for (var field in data.errors) {
					  if (data.errors.hasOwnProperty(field)) {
					  	if(data.errors[field].value && data.errors[field].value.length < 50) {
						  	response += data.errors[field].value + ' is invalid.';
						  }
					  }
					}
					toastr.warning("Some of the form information was invalid. " + response);
				} else {
					toastr.error('Hmmmm, the server is having trouble with the ' + category + '.');
				}
			} else {
				console.log('api request error.');
				if(status !== 404) {
					toastr.error('Hmmmm, there server is having trouble with the ' + category + '.');
				}
			}
		};

		return endpoints;
	});
})();
