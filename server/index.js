var browserify = require('browserify-middleware')//99.9% sure dont use or need
var express = require('express')
var Path = require('path')
var axios = require('axios')
var url = require('url')
//var useData = require('../client/useData')
var $ = require('jquery');
var bodyParser = require('body-parser')

//i have these in my api keys folder
//var googleKey = 
//var darkskyKey =
var routes = express.Router()

routes.use(bodyParser.json());
//
// Provide a browserified file at a specified path
//
//routes.get('/app-bundle.js',
 // browserify('./client/app.js'))

//
// Example endpoint (also tested in test/server/index_test.js)
//

routes.get('/gogo', function(req, res) {
  console.log('PJ')
  //res.send(['node', 'express', 'browserify', 'mithril'])
   var url_parts = url.parse(req.url,true);
   var query = url_parts.query;
  //console.log(query);
  console.log(query.search)
  
    axios.get('http://www.omdbapi.com/?s='+query.search)
    //axios.get('http://google.com')

      .then(function(resp){

        //console.log(resp.data);
        res.send(resp.data)
        //useData.showData(resp);
        //console.log('PJPJPJPJPJPJPJ')
        
        //console.log(lat,long,'pjpj')
        /*
        axios.get()

        .then(function(resp){
          //console.log(resp.data)

          res.send(resp.data);
          return;
        })
        */
        //res.send(resp.data);
        return;
      }).catch(function(){
        console.log('api call failed')
      })
   


})
routes.get('/imdb', function(req, res) {
  console.log('PJ')
  //res.send(['node', 'express', 'browserify', 'mithril'])
   var url_parts = url.parse(req.url,true);
   var query = url_parts.query;
  //console.log(query);
  console.log(query.imdb)
  
    axios.get('http://www.omdbapi.com/?i='+query.imdb)
    //axios.get('http://google.com')

      .then(function(resp){

        console.log(resp.data);
        res.send(resp.data)
        
        return;
      }).catch(function(){
        console.log('api call failed')
      })
   


})


routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
