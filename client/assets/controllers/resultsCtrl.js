app.controller('resultsCtrl', function($scope, $sce, SearchService, $routeParams, $location) {
    console.log("results controller loading");

    $scope.videoUrl = "";

        // GRABBING THE FIRST VIDEO OF THAT SELECTED CHANNEL
    $scope.firstVideoSearch = function(channelId) {

        // console.log("first video search function hit in controller");

        SearchService.firstVideoSearch(channelId, function(data) {
            // console.log("video id inside controller:", data);
            let videoId = data;
            console.log("scope is",$scope);
            $scope.videoUrl = "https://www.youtube.com/embed/"+videoId+"?theme=light&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
            console.log("video id in mainCtrl: ", videoId, "video URL: ", $scope.videoUrl)
        });
        console.log("taking the user away from this controller!",$scope.videoUrl);
        $location.url('/result');
    }

});