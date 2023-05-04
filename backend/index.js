const express = require('express');
const db = require('./services/sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./services/winston');

const app = express();

app.use(
    cors({
        origin: '*',
    })
);

db.sequelize
    .sync()
    .then(() => {
        logger.info('Synced db.');
    })
    .catch((err) => {
        logger.info(`Failed to sync db: ${err.message}`);
    });

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', require('./routes/timeline'));

app.use('/api', require('./routes/search'));

app.use('/api', require('./routes/channelInfos'));

app.use('/api', require('./routes/video'));

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});
