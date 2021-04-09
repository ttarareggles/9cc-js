const express = require('express');
const app = express();

app.use(express.json());

app.post('/', function (req, res) {
    try{
        if (req.body && req.body.payload) {
            let filteredShows = []
            req.body.payload.forEach( (show) => {
                if (
                    show.drm && 
                    typeof(show.drm) === 'boolean' &&
                    show.drm == true && 
                    show.episodeCount && 
                    typeof(show.episodeCount) === 'number' &&
                    show.episodeCount > 0
                ) {
                    filteredShows.push(createShowRes(show))
                }
            })
            res.json({ response: filteredShows });
        }
        else { throw "Invalid JSON"}
    } catch (e) {
        res.status(400).json({ error: 'Could not decode request: JSON parsing failed' })}
});

app.all('*', function (req, res) {
    res.status(400).json({ error: 'Could not decode request: JSON parsing failed' })
});

const createShowRes = (showReq) => {
    const image = (showReq.image && showReq.image.showImage) ? showReq.image.showImage : ""
    const slug = showReq.slug ? showReq.slug : ""
    const title = showReq.title ? showReq.title : ""
    return { "image" : image, "slug" : slug, "title": title }
}

module.exports = app;
