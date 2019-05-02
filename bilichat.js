const express = require('express')
const request = require('request')

const app = express()
const connectHistoryApiFallback = require('connect-history-api-fallback');

const PORT = 5000

app.get('/api/avatar/:userid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    request('https://api.bilibili.com/x/space/acc/info?mid=' + req.params.userid, { json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let url = body.data.face
            if (url !== 'http://static.hdslb.com/images/member/noface.gif') {
                url = url + '@48w_48h'
            }
            request(url, { encoding: null }, (error2, response2, body2) => {
                if (!error2 && response2.statusCode == 200) {
                    res.type(response2.headers['content-type'])
                    res.send(body2)
                }
                else {
                    res.sendStatus(404)
                }
            });
        }
        else {
            res.sendStatus(404);
        }
    })
})

app.get('/api/stat/:roomid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    request('https://api.live.bilibili.com/room/v1/Room/room_init?id=' + req.params.roomid, { json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(body.data)
        } else {
            res.send({
                success: false,
                message: "server error"
            })
        }

    })
})

app.get('/api/avatar/:userid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public,max-age=86400');
    request('https://api.bilibili.com/x/space/acc/info?mid=' + req.params.userid, { json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let url = body.data.face
            res.send({
                face: url
            });
        }
        else {
            res.sendStatus(404);
        }
    })
});

app.use('/', connectHistoryApiFallback())
app.use('/', express.static('dist/browser'))


app.listen(PORT, () => console.log('Listen on port ' + PORT))