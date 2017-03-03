app.factory('SearchService', ['$http', '$location', function($http, $location) {

    var factory = {};
    
	factory.youTubeSearch = function(searchText, callback){

        console.log("search text: ", searchText, typeof(searchText));

		$http.get('/search/'+ searchText)
        .then(function(res) {
            if (typeof(callback) === 'function') {
                callback(res.data);
            };
        });
	}

    factory.firstVideoSearch = function(channelId, callback) {

        console.log("channel id passed in: ", channelId);

        $http.get('/first/' + channelId)
        .then(function(res) {
            if (typeof(callback) === 'function') {
                console.log("response from server received in first video service: ", res.data);
                callback(res.data);
            };
        })
    }
    
    return factory;

}]);
