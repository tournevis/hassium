# Hassium

Welcome to Hassuim Doc !

Hassium is a little server script to get twitter stream via Socket io .

It still in progress so be patient, it will come soon !

There is already Three clinent-side event :

### socket.emit  ('getTweet', myFilter )

  This is the entry of the script, search a minimum 3 letters-length word on the twitter stream.

### socket.on ('newTweet',function(data){})  

   Get the content, the name and the screen name from the new tweet !

### socket.on ('error',function(error){})  

  Error handler.


## Installation

```
git clone https://github.com/tournevis/hassium
npm i
touch apikey.json
```
And don't forget to put your api key in apikey.json .
If you want to grab some api acces go here : [Twitter Apps Manager](https://apps.twitter.com/)
Here is an exemple :

```
{
"consumer_key":         "keykeykey",
"consumer_secret":      "secretscret",
"access_token":         "tokentokentoken",
"access_token_secret":  "secrettoken"
}
```
