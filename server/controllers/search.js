// var google = require('googleapis');
var API_KEY = 'AIzaSyDqcpcc3ogh_xyqZpbN4r4P2nJ5Cb7-A0E'
var google = require('googleapis');
var youtube = google.youtube({ version: 'v3', auth: API_KEY });

// var YouTube         =   require('youtube-node');
// var youTube         =   new YouTube();
// youTube.setKey(API_KEY);

// var util = require('util');
// var youtube = google.youtube({
//     version: 'v3',
//     auth: '504942285572-5lh3o4d4ge6gt4bnhvqti06h6t1chkn5.apps.googleusercontent.com'
// });

// let oauth = youtube.authenticate({
//     type: "oauth",
//     client_id: '504942285572-5lh3o4d4ge6gt4bnhvqti06h6t1chkn5.apps.googleusercontent.com',
//     client_secret: 'JTBQmmpFlAXN04uRXdos5GQH'
// })

// ADD TO QUERY OPTIONS BELOW : 'id': 'dQw4w9WgXcQ,HL1UzIK-flA'

module.exports = {

    index: function (req, res) {

        // console.log("parameter ", req.params.id)

        let searchText = req.params.id

        var channelQueryOptions = {
            'part': 'id,snippet', // statistics
            'q': searchText, // add the string passed here
            'maxResults': 5,
            'type': 'channel'
        };

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


        youtube.search.list(channelQueryOptions, function (err, results) {
            if (err) {
                console.error(err);
                res.json(err);
            } else {
                for (var i in results.items) {
                    var item = results.items[i];
                    console.log(item);
                }
                // console.log(results);
                res.json(results);
            }
        });


    },

    firstVideo: function (req, res) {

        // ********* QUERY THE CHANNEL THE USER SELECTED (NOT USING YOUTUBE.SEARCH) TO GET SUBSCRIBER INFO AND STATISTICS

        console.log('req.params.id', req.params, req.params.id)
        let channelId = req.params.id

        var videoQueryOptions = {
            'part': 'id,snippet',
            'maxResults': 50,
            'type': 'video',
            'channelId': channelId,  // get this from the search results above
            'order': 'date'
        };

        var firstVideo = {};

        let handlePage = function (err, results) {
            // console.log("handle page function", results.nextPageToken);
            if (results.items.length > 0) {
                firstVideo = results.items[(results.items.length - 1)];
            };

            if (!results.nextPageToken) {
                // console.log("results: ", results);
                // console.log("final round with firstvideoid: ", firstVideo)
                res.json(firstVideo);
            } else {
                // console.log("*********results with token:", results.nextPageToken, results.items.length);
                videoQueryOptions.pageToken = results.nextPageToken;
                youtube.search.list(videoQueryOptions, handlePage);
            };

        }


        youtube.search.list(videoQueryOptions, handlePage);
    }
}