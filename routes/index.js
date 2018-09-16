var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var axios = require('axios');
let cookies =  require('js-cookie')

var BASE_URL = 'http://127.0.0.1:3001/api';



/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('login');
});



router.get('/login', function (req, res, next) {
  // console.log(req.cookies.username.isLogin)
  res.render('login', {layout: false});
});

router.post('/login', function (req, res, next) {


  axios.post(BASE_URL + '/login-admin', req.body)
    .then(function (response) {
      if (response.data.isValid === true) {
        //3600000
        
        res.cookie("username", {
          name: response.data.nama,
          isLogin: true
        }, {
          expires: new Date(Date.now() + 3600000)
        })
        res.redirect('/users/list-mahasiswa')
      }else{
        res.render('login', {layout: false, message : "Password / Username salah!"});
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  // res.render('login', {layout: false});
});

module.exports = router;