var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twit = require('twit');

const T = new Twit({
  consumer_key:         'dbUgdA0A6I7txwS76IW6MgStd',
  consumer_secret:      'eEnJs49wqBnclPOH0KDZ4ASrpjHkO60PLTQbhcnVMpg2PoppCA',
  access_token:         '2999468301-AaD62PlAupros2EP6i0JeS7VZXDvVarkPQypON5',
  access_token_secret:  'yj2kZT4ntbX8s7uDeQiVKglsvYBOfI4fZIcrPEPzTlq4u'
})

server.listen(process.env.PORT || 3030, function(){
  console.log("Node app is running at localhost:" + server.address().port);
});

io.on('connection',function(socket){
  var stream;
  console.log("connection");
  socket.on('getTweet', function(filter){
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
        io.emit('newTweet', msg);
      });
      console.log("stream started, filter : " + trackName);
    }else{
      io.emit('error',' The filter is too short ! ');
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
