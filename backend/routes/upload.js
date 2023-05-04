const express = require('express');
const multer = require('multer');
const db = require('../services/sequelize');
const ffprobe = require('ffprobe-client');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

async function GenerateGUID() {
  const guid = uuidv4();
  try {
    const video = await db.Video.findOne({
      where: {
        identifier: guid,
      },
    });

    if (video) {
      return GenerateGUID();
    } else {
      return guid;
    }
  } catch (error) {
    console.error('Error generating GUID:', error);
  }
}

const now = Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/videos');
  },
  filename: (req, file, cb) => {
    const OriginalNameWith_ = file.originalname.replace(/ /g, '_').replace(/:/g, '_').replace(/-/g, '_');
    cb(null, `${now}_${OriginalNameWith_}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4' || file.mimetype === 'video/avi') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP4 and AVI videos are accepted.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post('/upload', upload.single('inputFile'), async (req, res) => {

  const file = req.file;
  const UserIdentifier = req.query.UserIdentifier;
  const title = req.query.title;
  const description = req.query.description;
  //   console.log(UserIdentifier);

  if (!file) {
    res.status(400).json({ error: 'No file was provided.' });
    return;
  }

  const GUID = await GenerateGUID();

  try {
    const metadata = await ffprobe(file.path);
    const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
    const duration = videoStream.duration;
    const bitrate = videoStream.bit_rate;
    const bits_per_raw_sample = videoStream.bits_per_raw_sample;

    const user = await db.User.findOne({
      where: {
        identifier: UserIdentifier,
      },
    });

    const userId = user.id;

    const newVideo = await db.Video.create({
      path: `http://localhost:3001/static/videos/${now}_${file.originalname.replace(/ /g, '_').replace(/:/g, '_').replace(/-/g, '_')}`,
      title: title,
      description: description,
      thumbnail: 'http://dummyimage.com/1280x720.png/dddddd/000000',
      bitrate: bitrate,
      searchable_title: title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      identifier: GUID,
      user_id: user.id,
      length: duration, // Ajouter cette ligne pour définir la valeur de l'attribut length
    });

    res.json({ success: true, message: 'Video uploaded successfully', GUID });

    // Your remaining code...

  } catch (error) {
    console.error('Error extracting video metadata:', error);
    res.status(500).json({ error: 'Error extracting video metadata.' });
  }
});

module.exports = router;
