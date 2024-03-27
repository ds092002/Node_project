const multer = require('multer');

const image = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/Product');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

exports.upload = multer({storage: storage});