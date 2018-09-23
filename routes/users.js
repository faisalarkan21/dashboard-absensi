var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var axios = require('axios');
let cookies = require('js-cookie')

var BASE_URL = 'http://127.0.0.1:3001/api';



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});



router.get('/login', function (req, res, next) {
  res.render('login', {
    layout: false
  });
});

router.post('/login', function (req, res, next) {


  axios.post(BASE_URL + '/login-admin', req.body)
    .then(function (response) {
      if (response.data.isValid === true) {
        //3600000
        res.cookie("username", {
          name: "",
          isLogin: true
        }, {
          expires: new Date(Date.now() + 10000)
        })
        next()
        res.redirect('/users/list-mahasiswa')
      } else {
        res.render('login', {
          layout: false,
          message: "Password / Username salah!"
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  // res.render('login', {layout: false});
});


router.get('/list-pertemuan', function (req, res, next) {

  axios.get(BASE_URL + '/get-all-kelas')
    .then(function (response) {
      // handle success
      console.log(response.data);

      res.render('list-kelas', {
        data: response.data.data
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

router.get('/list-pertemuan/:kelas', function (req, res, next) {

  console.log(req.params.kelas)
  axios.get(BASE_URL + '/get-all-jadwal-kelas', {
      params: {
        kelas: req.params.kelas
      }
    })
    .then(function (response) {
      // handle success
      // console.log(response.data.data[0].log_dosen[0]);

      res.render('list-pertemuan', {
        data: response.data.data,
        kelas: response.data.kelas
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
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
        res.redirect('/users/list-dosen')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});


router.post('/post-kelas', function (req, res, next) {
  axios.post(BASE_URL + '/add-kelas', req.body)
    .then(function (response) {
      
      if (response.data === 'OK') {
        res.redirect('/users/list-pertemuan')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});



router.get('/add-kelas', function (req, res, next) {
  res.render('add-kelas')
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
        res.redirect('/users/list-mahasiswa')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/delete-mhs/:npm', function (req, res, next) {

  console.log(req.body)
  axios.post(BASE_URL + '/delete-mhs', {
      npm: req.params.npm
    })
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/users/list-mahasiswa')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.post('/delete-dsn/:nip', function (req, res, next) {

  console.log(req.body)
  axios.post(BASE_URL + '/delete-dsn', {
      nip: req.params.nip
    })
    .then(function (response) {
      console.log('response.data', response.data)
      if (response.data === 'OK') {
        res.redirect('/users/list-dosen')
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
        res.redirect('/users/list-mahasiswa')
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
        res.redirect('/users/list-dosen')
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

router.get('/list-log-pertemuan-xls', function (req, res, next) {
  console.log(req.query)
  axios.get(BASE_URL + '/get-log', {
    params: {
      id: req.query.log_id,
      idPert: req.query.pert,
      idJadwal: req.query.idJadwal
    }
  })
    .then(function (response) {
      // handle success
      console.log('Menerima Data');
      // console.log(response.data.data);

     let {logMhs, logDosen} = response.data.data;

    //  Array.prototype.push.apply(logDosen, logMhs);

      

      Object.assign({logDosen}, logMhs)

      console.log(logDosen)
      /**
       * Ngerubah array mahasiswa jdi xlsx
       */
      res.xls('data-log-pert.xlsx', logDosen);
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


router.get('/detail-log/:log_id', function (req, res, next) {
  // console.log(req.params.log_id)
  axios.get(BASE_URL + '/get-log', {
      params: {
        id: req.params.log_id,
        idPert: req.query.pert,
        idJadwal: req.query.idJadwal
      }
    })
    .then(function (response) {
      // handle success
      console.log(response.data.data.logMhs);
      res.render('detail-pertemuan', {
        getDataDosen: response.data.data.logDosen,
        idLog: req.params.log_id,
        getDataMhs: response.data.data.logMhs[0] === null ? null : response.data.data.logMhs
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

router.get('/logout', function (req, res, next) {
  res.clearCookie('username')
  res.redirect('/login')

});

module.exports = router;