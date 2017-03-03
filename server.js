var express         =   require('express');
var path            =   require('path');
var app             =   express();
var bp              =   require('body-parser');
var google          =   require('googleapis');
// var fs              =   require('fs');

var root            =   __dirname;
var port            =   8000;

app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './bower_components')));
app.use(bp.json());
require('./server/config/routes.js')(app)
app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});

