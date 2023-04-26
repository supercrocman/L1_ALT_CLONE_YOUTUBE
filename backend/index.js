const express = require('express');
const winston = require('winston');
const db = require('./services/sequelize');

const cors = require('cors');

const rooterProfil = require('./routes/rooter_profil');

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
const port = 3001;

app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    })
); // CORS pour autoriser le partage de ressources entre origines multiples (Cross-Origin Resource Sharing)

app.use(express.json()); // Middleware pour analyser les requêtes au format JSON

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});

app.use('/profil', rooterProfil); // Utiliser le routeur pour toutes les demandes effectuées vers /profil
