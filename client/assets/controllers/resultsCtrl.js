app.controller('resultsCtrl', function($scope, $sce, SearchService, $routeParams, $location) {
    console.log("results controller loading");

    $scope.videoUrl = undefined;
    $scope.videoId = undefined;

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

        // GRABBING THE FIRST VIDEO OF THE CHANNEL ID PASSED VIA URL PARAMETER

    SearchService.firstVideoSearch($routeParams.id, function(data) {
        console.log($routeParams.id)
        // console.log("video id inside controller:", data);
        $scope.videoId = data;
        // console.log("scope is",$scope);
        $scope.videoUrl = "https://www.youtube.com/embed/"+$scope.videoId+"?theme=light&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
        console.log("video ID in resultCtrl: ", $scope.videoId, "video URL: ", $scope.videoUrl)
    });

});