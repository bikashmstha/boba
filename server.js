var express         =   require('express');
var path            =   require('path');
var app             =   express();
var bp              =   require('body-parser');
var google          =   require('googleapis');
// var mongoose        =   require('mongoose');
var fs              =   require('fs');

// var YouTube         =   require('youtube-node');
// var youTube         =   new YouTube();
// youTube.setKey('AIzaSyDqcpcc3ogh_xyqZpbN4r4P2nJ5Cb7-A0E');

var root            =   __dirname;
var port            =   8000;

app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './bower_components')));
app.use(bp.json());
// require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)
app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});

