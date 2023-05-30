const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', function(req, res, next) {
    fetch(`https://newsapi.org/v2/everything?sources=The-Verge&apiKey=${process.env.VOTRE_CLE_API}`)
    .then((res)=> res.json())
    .then((data)=>  {
        if(data.status === 'ok') {
        res.json({articles:data.articles})
        }
        }) 
    })
    

    module.exports = router;