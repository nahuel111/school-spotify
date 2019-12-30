const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/spotify/:clientId/:clientSecret', (req, resp) => {
    console.log("api : ",req.params.clientId);
    let clientId = req.params.clientId;
    let clientSecret = req.params.clientSecret;
    // let token = req.params.token;
    let spotifyUrl = 'https://accounts.spotify.com/api/token';

    var authOptions = {
        url: spotifyUrl,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: 'Basic ' + new Buffer(`${clientId}:${clientSecret}`).toString('base64')
        },
        form: {
            grant_type: 'client_credentials',
            // refresh_token: token
        },
        json: true
    };

    request.post(authOptions, (err, httpResponse, body) => {
        if (err) {
            return resp.status(400).json({ ok: false, mensaje: 'fallo',err})
        }
        resp.json(body);
    });
});

app.listen(port, (err) => {
    if (err) throw new Error(err);
});