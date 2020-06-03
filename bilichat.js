/*
bilichat.js
仅用于本地测试(非服务端渲染模式-ng serve)
或使用 https://github.com/3Shain/BiliChat.CacheServer
*/

const express = require('express')
const request = require('request')
const fs = require('fs')

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

app.get('/api/room_config/:roomid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    request('https://api.live.bilibili.com/room/v1/Danmu/getConf?room_id=' + req.params.roomid, { json: true }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(body)
      } else {
        res.sendStatus(403)
      }
    })
  })
  
app.get('/api/stat/:roomid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    request('https://api.live.bilibili.com/room/v1/Room/room_init?id=' + req.params.roomid, { json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let ret = body.data;
            let configPath = './config.json';
            if (fs.existsSync(`./config.${req.params.roomid}.json`)) {
                configPath = `./config.${req.params.roomid}.json`;
            }
            fs.readFile(configPath, 'utf8', (err, data) => {
                if (!err)
                    ret.config = JSON.parse(data);
                res.send(ret);
            });
        } else {
            res.send({
                success: false,
                message: "server error"
            });
        }

    })
})

app.get('/api/avturl/:userid', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
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
/*
app.get('/api/config', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    fs.readFile('./config.json', 'utf8', (err, data) => {
        if (!err)
            res.send(data);
        else
            res.sendStatus(404);
    })
});
*/
app.use('/', connectHistoryApiFallback())
app.use('/', express.static('dist/browser'))


app.listen(PORT, () => console.log('Listen on port ' + PORT))