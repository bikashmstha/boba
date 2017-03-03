var API_KEY = 'AIzaSyDqcpcc3ogh_xyqZpbN4r4P2nJ5Cb7-A0E'
var google = require('googleapis');
var youtube = google.youtube({ version: 'v3', auth: API_KEY });

module.exports = {

    index: function (req, res) {

        // console.log("parameter ", req.params.id)

        let searchText = req.params.id

        var channelQueryOptions = {
            'part': 'id,snippet',
            'q': searchText, // user passed string
            'maxResults': 5,
            'type': 'channel'
        };

        youtube.search.list(channelQueryOptions, function (err, results) {
            if (err) {
                console.error(err);
                res.json(err);
            } else {
                for (var i in results.items) {
                    var item = results.items[i];
                    console.log(item);
                }
                res.json(results);
            }
        });


    },

    firstVideo: function (req, res) {

        // ********* QUERY THE CHANNEL THE USER SELECTED (NOT USING YOUTUBE.SEARCH) TO GET SUBSCRIBER INFO AND STATISTICS

                // var channelStatisticsOptions = {
        //         'mine': false,
        //         'part': 'id, statistics',
        //         'channelId': channelId
        // };

        // let getChannelStats = function(err, results) {
            

        //     console.log("************", channelId);

        //     youtube.channels.list(channelStatisticsOptions, function(err, channelStats) {
        //         console.log('these are the channel stats for each channel: ', channelStats);
        //     })
        // }

        // youtube.channels.list(channelStatisticsOptions, getChannelStats);

        let channelId = req.params.id

        var videoQueryOptions = {
            'part': 'id,snippet',
            'maxResults': 50,
            'type': 'video',
            'channelId': channelId,  // gets this from the search results above
            'order': 'date'
        };

        var firstVideo = {};

        let handlePage = function (err, results) {
            if (results.items.length > 0) {
                firstVideo = results.items[(results.items.length - 1)];
            };

            if (!results.nextPageToken) {
                res.json(firstVideo);
            } else {
                videoQueryOptions.pageToken = results.nextPageToken;
                youtube.search.list(videoQueryOptions, handlePage);
            };

        }

        youtube.search.list(videoQueryOptions, handlePage);
    }
}