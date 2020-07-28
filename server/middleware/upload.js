const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedType = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedType.indexOf(file.mimetype.toLowerCase()) > -1) {
            callback(null, true);
        } else {
            console.log('Only type jpg and png supported!');
            callback(null, false);
        }
    },
    limits: 1024 * 1024 * 2
}).single('photo');

module.exports = upload;
