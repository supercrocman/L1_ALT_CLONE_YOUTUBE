const express = require('express');
const multer = require('multer');
const db = require('../services/sequelize');
const ffprobe = require('ffprobe-client');
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

function GenerateGUID() {
  const guid = uuidv4();
  try {
    const user = await db.User.findOne({
      where: {
        identifier: guid,
      },
    });
    if (user) {
      return GenerateGUID(uuidv4());
    } else {
      return guid;
    }
  }catch(error){
    console.error('Error generating GUID:', error);
    res.status(500).json({ error: 'Error generating GUID.' });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/src/videos');
  },
  filename: (req, file, cb) => {
    const OriginalNameWith_ = file.originalname.replace(/ /g, '_').replace(/:/g, '_').replace(/-/g, '_');
    cb(null, `${Date.now()}_${OriginalNameWith_}`);
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
  console.log(file.path);
  const UserIdentifier = req.query.UserIdentifier;
  //   console.log(UserIdentifier);

  if (!file) {
    res.status(400).json({ error: 'No file was provided.' });
    return;
  }

  const guid = uuidv4();
  console.log('Generated GUID:', guid);

  const GUID = GenerateGUID();
  console.log('Generated GUID:', GUID);

  try {
    const metadata = await ffprobe(file.path);
    const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
    const duration = videoStream.duration;
    const bitrate = videoStream.bit_rate;
    const bits_per_raw_sample = videoStream.bits_per_raw_sample;
    const title = file.originalname.replace(/ /g, '_').replace(/:/g, '_').replace(/-/g, '_').split('.')[0];
    // const hdr = bits_per_raw_sample > 8 : true ? videoStream.hdr : false;

    console.log('Video duration:', `${duration} seconds`);

    // Your remaining code...

  } catch (error) {
    console.error('Error extracting video metadata:', error);
    res.status(500).json({ error: 'Error extracting video metadata.' });
  }
  const user = await db.User.findOne({
    where: {
      identifier: UserIdentifier,
    },
  });
  const userId = user.id;
  // console.log(userId);

  //    const newVideo = await db.Video.create({
  //     path: file.path,
  //     title: 'Sample title',
  //     thumbnail: 'http://dummyimage.com/1280x720.png/dddddd/000000',
  //     duration: duration,
  //     bitrate: bitrate,
  //     searchable_title: title,
  //     identifier: ,
  //     user_id: 1,
  //   });

  res.status(200).json({ success: true, message: 'Video uploaded successfully', file });
});

module.exports = router;
