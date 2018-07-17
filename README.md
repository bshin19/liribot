# Liribot
## Project Overview
The liribot takes input via **command prompt/terminal** and calls an api based on this input.\
The APIs utilized by this project are called via Node and include Twitter, OMDB, and Spotify.\
Also utilizes the Node Filesystem.\
The responses are logged in the command line.

## Movie Info
When "movie-this" is searched, all following arguments are used to determine the movie searched via the OMDB api.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/mov.PNG) \
The response data is parsed and logged.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/mov-response.PNG)
Data returned includes:
+ Movie's Name
+ Release Year
+ IMDB Rating
+ Rotten Tomatoes Rating
+ Country Filmed In
+ Plot Summary
+ Actors

## Song Info
When "spotify-this-song" is searched, all following arguments are used to determine the song searched via the Spotify api.
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/spot.PNG) \
The response data is parsed and logged.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/spotresponse.PNG)
Data returned includes: 
+ Artist
+ Song's Name
+ Spotify Link to play clip
+ Song's Album

## Tweets
When "my-tweets" is searched, no further arguments are necessary.\
Liribot compiles 20 tweets from the user defined in a .env file via the Twitter api.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/tweets.PNG) \
The response data is parsed and logged.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/tweetsresponse.PNG) \
Data returned includes:
+ Tweet body
+ Tweet's Post Date 

## Random
When "do-what-it-says" is searched, use the node filesystem to read a file\
and use the fields provided to perform a search for the user.\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/doit.PNG) \
This defaults to random.txt, which contains the arguments "spotify-this-song" and "gasoline."\
![cmdline](https://github.com/bshin19/liribot/blob/master/assets/images/doitresponse.PNG) \
The resulting search will use the first argument provided to determine which style of search is performed.\
The second argument in random.txt determines what movie or song is searched and does nothing when searching tweets.

## Potential Updates
### General
1. Log responses to a file
1. Add OR values to each search to make searching easier (eg my-tweets || tweets)

### Tweets
+ Allow for searching users instead of locking the search into the value in the .env.

## Random
+ Add a random element to the js and provide more values in the csv random.txt