
const multer = require('multer'); //Package used for extracting files from requests

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cbFunction) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mimeType');
        if (isValid) {
            error = null;
        }
        cbFunction(error, 'backend/images');
    },
    filename: (req, file, cbFunction) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cbFunction(null, name + '-' + Date.now() + '.' + ext)
    }
});

module.exports = multer({storage: storage}).single('image');
