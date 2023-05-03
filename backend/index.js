const express = require('express');
const cors = require('cors');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const db = require('./services/sequelize');
const profilRouter = require('./routes/profils');

const app = express();

app.use(cookieParser());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

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
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/profil', profilRouter);

app.use('/api', require('./routes/search'));

app.use('/api', require('./routes/channelInfos'));

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});
