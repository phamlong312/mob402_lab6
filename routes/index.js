var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'views/uploads/');
  },
  filename: function(req, file, cb) {
    var random = Math.random();
    cb(null, random + Date.now() + file.originalname );
  },

});

var upload = multer({ storage: storage,

  limits: {
    fileSize: 2 * 1024 * 1024
  }


}).single('avatar');
var uploadarr = multer({ storage: storage,
  fileFilter:(req, file, cb)=>{
    if(file.mimetype == 'image/jpeg'){
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('lỗi kiểu file'));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
    files : 5,
  }
}).array('avatar');
// var upload = multer({dest: 'uploads/'});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/profile', function(req, res, next) {
  upload(req, res, function (err){
    if(err){
      res.render('index',{
        title: err.message
      });
    }else {
      res.render('index', { title: 'Upload thành công !, '+ 'Kiểm tra thư mục uploads' });

    }
  })
});
router.post('/uploads', function(req, res, next) {
  uploadarr(req, res, function (err){
    if(err){
      res.render('index',{
        title: err.message
      });
    }else{
      res.render('index', { title: 'Upload thành công !, '+ 'Kiểm tra thư mục uploads' });

    }
  })

});
module.exports = router;

