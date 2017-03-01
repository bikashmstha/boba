app.controller('mainCtrl', function($scope, $sce, SearchService, $routeParams, $location) {
    console.log("main controller loading");

    $scope.channelResults = {};
    $scope.videoId;
    $scope.videoUrl = "https://www.youtube.com/embed/4LZXQQNUATw?theme=light&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1";

    // OVERRIDING SECURITY TO ALLOW URL TO BE USED AS SRC FOR VIDEO
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    // SEARCHING FOR CHANNELS THAT MATCH THE SEARCH QUERY ENTERED
    $scope.youTubeSearch = function() {
        console.log("text received from input form", $scope.newSearch.text)

        SearchService.youTubeSearch($scope.newSearch.text, function(data) {
            console.log("this is the search text entered: ", $scope.newSearch.text)
            console.log("data recevied from be now in fe: ", data);
            $scope.channelResults = data.items;
        });
    }

    // GRABBING THE FIRST VIDEO OF THAT SELECTED CHANNEL
    $scope.firstVideoSearch = function() {
        SearchService.youTubeSearch($scope.newSearch.text, function(data) {
            console.log(data);
            $scope.videoId = data;
            // $scope.videoUrl = "https://www.youtube.com/embed/"+$scope.videoId+"?theme=light&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
            console.log("video id in mainCtrl: ", $scope.videoId, "video URL: ", $scope.videoUrl)
        });
        $location.url('/result');
    }


})