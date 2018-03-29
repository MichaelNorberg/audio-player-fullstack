const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const request = require('request');
const keys = require('./keys.json');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

//constructor function for formating request data
function Song(source, title, description, id, artwork, index) {
    this.source = source + "?&client_id=" + keys.scKey;
    this.title = title;
    this.description = description;
    this.id = id;
    this.artwork = artwork;
    this.index = index;
};

//handles the search request
app.post('/search', (req, res) => {
    let searchTerm = req.body.searchTerm;
    let url = "https://api.soundcloud.com/tracks?q=" + searchTerm + "&client_id=" + keys.scKey;
    request(url, function (error, response, body) {
        if (error) {
            console.log('ERROR! Couldnt access the API because of ' + error);
        } else {
            body = JSON.parse(body);
            let songs = body;
            songs = songs.map((song, i) => {
            return new Song(song.stream_url, song.title, song.description ,song.id, song.artwork_url, i);
            })
            res.json(songs);
        };
    });
});
//handles the intial data request - kind of like an artist of the week on the home page
app.get('/songs', (req, res) => {
    let url = "https://api.soundcloud.com/tracks?q=dilly-dally&client_id=" + keys.scKey;
    request(url, function (error, response, body) {
        if (error) {
            console.log('ERROR! Couldnt access the API because of ' + error);
        } else {
            body = JSON.parse(body);
            let songs = body;
            songs = songs.map((song, i) => {
            return new Song(song.stream_url, song.title, song.description ,song.id, song.artwork_url, i);
            })
            res.json(songs);
        };
    });
});


app.listen(8080, () => {
    console.log('the server is running on port 8080')
});