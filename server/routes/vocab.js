const express = require('express')
const router = express.Router();
const http = require("https");
const Word = require('../models/wordSchema');

const {application_id,application_keys,base_url} = require('../keys');

const app_id = application_id;
const app_key = application_keys;
const fields = "pronunciations";
const strictMatch = "false";

router.post('/add-word',(req,res)=>{
    const wordId = req.body.word;
    const options = {
        host: 'od-api.oxforddictionaries.com',
        port: '443',
        path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
        method: "GET",
        headers: {
          'app_id': app_id,
          'app_key': app_key
        }
      };
      
      http.get(options, (resp) => {
          let body = '';
          resp.on('data', (d) => {
              body += d;
          });
          resp.on('end', () => {
              if(body) {
                  Word.findOne({word:wordId.toLowerCase()})
                    .then(item=>{
                        if(item){
                            return res.json({error:"Already in your dictionary!"})
                        } 
                        const newWord = new Word({
                            word:wordId.toLowerCase(),
                            data:body
                        });
                        newWord.save()
                            .then(response=>res.json({success:true}))
                            .catch(err=>console.log(err))
                    }).catch(err=>console.log(err))
              }
          });
      });
});

router.get("/get-words",(req,res)=>{
    Word.find()
        .then(words=>{
            return res.json(words)
        }).catch(err=>console.log(err))
});

router.post("/search",(req,res)=>{
    const pattern = new RegExp("^"+req.body.word)
    Word.find({word:{$regex:pattern}})
        .then(words=>{
            res.json(words)
        })
})

module.exports = router;