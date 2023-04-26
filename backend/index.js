const express = require('express');
const winston = require('winston');
const db = require('./services/sequelize');
const bodyParser = require('body-parser');


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

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', async (req, res) => {
    const user = await db.User.findByPk(4);
    const subcount = await user.getSubCount();
    const subscriptions = await user.getSubscriptions();
    res.send(`User 4 subs :  ${subcount}, subscriptions : ${subscriptions}`);
});

app.use('/api', require('./routes/search'));

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});
