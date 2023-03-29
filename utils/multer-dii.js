const multer  = require('multer');
const { v4  } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, v4() + '.'+ file.mimetype.split('/')[1])
    }
})
const upload = multer({ storage: storage })

module.exports = upload;