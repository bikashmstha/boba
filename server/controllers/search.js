// var google = require('googleapis');
var API_KEY = 'AIzaSyDqcpcc3ogh_xyqZpbN4r4P2nJ5Cb7-A0E'
var google = require('googleapis');
var youtube = google.youtube({version: 'v3', auth: API_KEY});

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

    index: function(req, res) {

        // console.log("parameter ", req.params.id)

        let searchText = req.params.id

        var channelQueryOptions = {
            'part': 'id,snippet',
            'q': searchText, // add the string passed here
            'maxResults': 5,
            'type': 'channel'
        };

        youtube.search.list(channelQueryOptions, function(err, results) {
            if(err) {
                console.error(err);
                res.json(err);
            } else {
                for(var i in results.items) {
                    var item = results.items[i];
                    // item.thumbnail = 
                    // console.log("Title: ", item.snippet.channelTitle)
                }
                // console.log(results);
                res.json(results);
            }
        });


    },

    firstVideo: function(req, res) {

        console.log('req.params.id', req.params, req.params.id)
        let channelId = req.params.id

        var videoQueryOptions = {
            'part': 'id,snippet',
            'maxResults': 50,
            'type': 'video',
            'channelId': channelId,  // get this from the search results above
            'order': 'date'
        };

        let handlePage = function (err, results) {
            console.log("handle page function")
            if(!results.nextPageToken) {
                var firstVideo = results.items[(results.items.length-1)];
                console.log("results: ", results);
                console.log("final round with firstvideoid: ", firstVideo)
                res.json(firstVideo);
            } else {
                videoQueryOptions.pageToken = results.token;
                youtube.search.list(videoQueryOptions, handlePage);
            }
        }

        youtube.search.list(videoQueryOptions, handlePage);
    }
}