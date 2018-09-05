var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var axios = require('axios');


var BASE_URL = 'http://127.0.0.1:3001/api';



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/add-mhs', function (req, res, next) {

  axios.get(BASE_URL + '/get-list-kelas')
    .then(function (response) {
      // handle success
      console.log(response.data);

      res.render('add-mhs', {
        data: response.data.data
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

router.get('/add-dsn', function (req, res, next) {
  res.render('add-dsn');
});

router.post('/post-dsn', function (req, res, next) {

  if (req.body.password !== req.body.password2) {
    return res.render('add-dsn', {
      error: 'Password Konfrimasi Tidak Sama'
    });
  }

  delete req.body.password2

  axios.post(BASE_URL + '/add-dsn', req.body)
    .then(function (response) {

      if (response.data === 'OK') {
        res.redirect('/list-dosen')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/post-mhs', function (req, res, next) {

  if (req.body.password !== req.body.password2) {
    return res.render('add-mhs', {
      error: 'Password Konfrimasi Tidak Sama'
    });
  }

  console.log(req.body)

  delete req.body.password2

  axios.post(BASE_URL + '/add-mhs', req.body)
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/list-mahasiswa')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/delete-mhs/:npm', function (req, res, next) {

  console.log(req.body)
  axios.post(BASE_URL + '/delete-mhs', {npm:req.params.npm})
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/list-mahasiswa')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/delete-dsn/:nip', function (req, res, next) {

  console.log(req.body)
  axios.post(BASE_URL + '/delete-dsn', {nip:req.params.nip})
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/list-dosen')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});



router.post('/update-mhs', function (req, res, next) {
  axios.post(BASE_URL + '/update-mhs', req.body)
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/list-mahasiswa')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});




router.post('/update-dsn', function (req, res, next) {
  axios.post(BASE_URL + '/update-dsn', req.body)
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/list-dosen')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});




router.get('/list-mahasiswa', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-mhs')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.render('list-mhs', {
        getData: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});



router.get('/update-mhs/:npm', function (req, res, next) {
  console.log(req.params.npm)
  axios.get(BASE_URL + '/get-list-kelas')
    .then(function (responseKelas) {
      // handle success
      // console.log(response.data);



      axios.get(BASE_URL + '/get-mhs', {
          params: {
            npm: req.params.npm
          }
        })
        .then(function (response) {
          // handle success
          console.log(response.data.data[0]);
          return res.render('update-mhs', {
            getData: response.data.data[0],
            listKelas: responseKelas.data.data
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })





    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });




});

router.get('/update-dsn/:nip', function (req, res, next) {
  console.log(req.params.nip)

  // handle success
  // console.log(response.data);

  axios.get(BASE_URL + '/get-dsn', {
      params: {
        nip: req.params.nip
      }
    })
    .then(function (response) {
      // handle success
      console.log(response.data.data[0]);
      return res.render('update-dsn', {
        getData: response.data.data[0]
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })










});

router.get('/list-kelas', function (req, res, next) {
  console.log(req.params.npm)
  axios.get(BASE_URL + '/get-list-kelas')
    .then(function (response) {
      // handle success
      console.log(response.data)
      // console.log(response.data.data[0]);
      return res.json(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});




router.get('/list-dosen', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-dosen')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.render('list-dsn', {
        getData: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

router.get('/list-log-mahasiswa', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-log-mhs')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.render('list-log-mhs', {
        getData: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

router.get('/list-log-mahasiswa-xls', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-log-mhs-xls')
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

router.get('/list-log-dosen-xls', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-log-dosen-xls')
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




router.get('/list-log-dosen', function (req, res, next) {
  axios.get(BASE_URL + '/get-all-log-dsn')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.render('list-log-dsn', {
        getData: response.data
      });
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