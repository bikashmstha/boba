app.controller('mainCtrl', function($scope, $sce, SearchService, $routeParams, $location) {
    console.log("main controller loading");

    $scope.channelResults = {};

    // OVERRIDING SECURITY TO ALLOW URL TO BE USED AS SRC FOR VIDEO
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    // SEARCHING FOR CHANNELS THAT MATCH THE SEARCH QUERY ENTERED
    $scope.youTubeSearch = function() {
        $scope.channelResults = {};

        // console.log("text received from input form", $scope.newSearch.text)

        SearchService.youTubeSearch($scope.newSearch.text, function(data) {
            // console.log("this is the search text entered: ", $scope.newSearch.text)
            // console.log("SEARCH data recevied from be now in fe: ", data);
            $scope.channelResults = data.items;
        });
    }

})