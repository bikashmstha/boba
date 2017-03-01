app.factory('SearchService', ['$http', '$location', function($http, $location) {

    var factory = {};
    
	factory.youTubeSearch = function(searchText, callback){

        console.log("search text: ", searchText, typeof(searchText));

		$http.get('/search/'+ searchText)
        .then(function(res) {
            if (typeof(callback) === 'function') {
                console.log("response from server received in search service: ", res.data);
                // for(var i in res.data.items) {
                //     var item = res.data.items[i];
                //     console.log("Title: ", item.snippet.channelTitle)
                // }
                callback(res.data);
            };
        });
	}

    factory.firstVideoSearch = function(channelId, callback) {

        console.log("channel id passed in: ", channelId);

        $http.get('/findFirstVideo', channelId)
        .then(function(res) {
            if (typeof(callback) === 'function') {
                console.log("response from server received in search service: ", res.data);
                let videoId = res.data.id.videoId
                console.log(videoId)
                callback(videoId);
            };
        })
    }
    
    return factory;

}]);
