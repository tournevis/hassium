var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twit = require('twit');
var key = require('./apikey.json');

const T = new Twit({
  consumer_key:         key.consumer_key,
  consumer_secret:      key.consumer_secret,
  access_token:         key.access_token,
  access_token_secret:  key.access_token_secret
})

server.listen(process.env.PORT || 3030, function(){
  console.log("Node app is running at localhost:" + server.address().port);
});

io.on('connection',function(socket){
  var stream;
  stream = null;
  console.log("connection");
  socket.on('getTweet', function(filter){
    stream = null;
    console.log(filter);
    var trackName =  (filter.length > 3 ) ? filter : null;
    if(trackName != null){
      stream = T.stream('statuses/filter', { track: trackName })
      stream.on('tweet', function (tweet) {
        //Twit.currentTwitStream = stream;
        var msg ={};
        msg.name  = tweet.user.name;
        msg.screenName = tweet.user.screen_name ;
        msg.content = tweet.text ;
        socket.emit('newTweet', msg);
      });
      console.log("stream started, filter : " + trackName);
      stream.on ('warning', function(warning) {
        console.log(warning);
      });
      stream.on ('error', function(error) {
        console.log(error);
      });
    }else{
      socket.emit('error',' The filter is too short ! ');
    }
  });
  socket.on('disconnect',function(){
    if (stream) {
        stream.stop();
        stream = null;
        console.log("Stream Stopped");
    }
  });
});
