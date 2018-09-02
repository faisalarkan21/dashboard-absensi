var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var axios = require('axios');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'arkan14811',
  database: 'absensi_gundar'
});

var BASE_URL =  'http://127.0.0.1:3001/api';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list-mahasiswa', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-mhs')
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.render('list-mhs', {getData: response.data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

router.get('/list-dosen', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-dosen')
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.render('list-dsn', {getData: response.data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

router.get('/list-log-mahasiswa', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-log-mhs')
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.render('list-log-mhs', {getData: response.data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

router.get('/list-log-mahasiswa-xls', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-log-mhs-xls')
  .then(function (response) {
    // handle success
    console.log('Menerima Data');
    console.log(response.data.data);

    /**
     * Ngerubah array mahasiswa jdi xlsx
     */
    res.xls('data-log-mhs.xlsx', response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

router.get('/list-log-dosen-xls', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-log-dosen-xls')
  .then(function (response) {
    // handle success
    console.log('Menerima Data');
    console.log(response.data);
    res.xls('data-log-dosen.xlsx', response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});




router.get('/list-log-dosen', function(req, res, next) {
  axios.get(BASE_URL+ '/get-all-log-dsn')
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.render('list-log-dsn', {getData: response.data});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

module.exports = router;
