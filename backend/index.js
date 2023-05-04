const express = require('express');
const cors = require('cors');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const db = require('./services/sequelize');
const profilRouter = require('./routes/profils');
const path = require('path');
const logger = require('./services/winston');

const app = express();

db.sequelize
    .sync()
    .then(() => {
        logger.info('Synced db.');
    })
    .catch((err) => {
        logger.info(`Failed to sync db: ${err.message}`);
    });

const port = 3001;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cookieParser());
app.use(express.static(`/src/avatar/`));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/profil', profilRouter);
app.use('/api', require('./routes/timeline'));

app.use('/api', require('./routes/search'));

app.use('/api', require('./routes/channelInfos'));

app.use('/api', require('./routes/video'));

app.use('/api', require('./routes/upload'));

const videoPath = path.join(__dirname, './src/videos');
app.use('/static/videos', express.static(videoPath));

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});
