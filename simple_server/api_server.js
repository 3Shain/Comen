const express = require('express')
const request = require('request')

const app = express()

app.get('/avatar/:userid',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    request('https://api.bilibili.com/x/space/acc/info?mid='+req.params.userid,{json:true},(error,response,body)=>{
        if(!error&&response.statusCode==200){
            request(body.data.face,{encoding:null},(error2,response2,body2)=>{
                if(!error2&&response2.statusCode==200){
                    res.type(response2.headers['content-type'])
                    res.send(body2)
                }
                else{
                    res.sendStatus(404)
                }
            });
        }
        else{
            res.sendStatus(404);
        }
    })
})

app.get('/stat/:roomid',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    request('https://api.live.bilibili.com/room/v1/Room/room_init?id='+req.params.roomid,{json:true},(error,response,body)=>{
        if(!error&&response.statusCode==200){
            res.send({
                success:true,
                message:"",
                data:body.data
        })
        }else
        {
            res.send({
                success:false,
                message:"server error"
            })
        }

    })
})

app.listen(5000,()=>console.log('Listen on port 5000'))