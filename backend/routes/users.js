var express = require('express');
var router = express.Router();
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
/* GET users listing. */
const uid2 = require('uid2');
const bcrypt = require('bcrypt');




router.get('/', function(req, res) {
  res.send('hello la team');
});

router.post('/signup', function (req, res){

  if(!checkBody(req.body, ['username', 'password'])){
    res.json({result:false, error: 'Empty fields'});
    return;
  }
const token = uid2(32);

  User.findOne({username: req.body.username}).then((data) => {
    if (data === null){
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hash,
        token: token,
        canBookmark: true,
      });
      newUser.save().then(() => {
        res.json({result: true, token: token})
      });
    }else{
      const userExist = 'L\'utilisateur ' + req.body.username + ' existe déjà!';
      res.json({result: false, userExist});
    };
  }); 
});

router.post('/signin', function (req, res){
  if(!checkBody(req.body, ['username', 'password'])){
    res.json({result:false, error: 'Empty fields'});
    return;
  }
  User.findOne({username: req.body.username}).then((data)=>{
    if(bcrypt.compareSync(req.body.password, data.password)){
      res.json({result: true, token: data.token})
    }else{
      res.json({result: false, error: 'Identifiants incorrect'})
    }
  })
})

router.get('/canBookmark/:token', function(req, res){
  User.findOne({token: req.params.token}).then((data)=>{
    if(data){
      res.json({result: true, canBookmark: data.canBookmark})
    }else{
      res.json({result: false, error: 'Utilisateur non trouvé'})
    }
  })
})

module.exports = router;
