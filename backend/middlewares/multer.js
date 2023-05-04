const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

const MIMES_TYPES = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './src/avatar';
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        callback(null, dir);
    },

    filename: (req, file, callback) => {
        const array = new Uint32Array(1);
        const valueArray = crypto
            .getRandomValues(array)
            .toString()
            .split(',')
            .join('');
        const name = file.originalname.split('.')[0];
        const extensions = MIMES_TYPES[file.mimetype];
        callback(null, `${name + valueArray}.${extensions}`);
    },
});

module.exports = multer({ storage }).single('image');
