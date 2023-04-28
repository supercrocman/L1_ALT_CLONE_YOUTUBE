// Importation du package jsonwebtoken
// eslint-disable-next-line import/no-extraneous-dependencies
const { verify } = require('jsonwebtoken');

export default (req, res, next) => {
    // Exportation du middleware d'authentification
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupérer le token dans le header de la requête
        const decodedToken = verify(token, 'RANDOM_TOKEN_SECRET'); // Décoder le token
        const { userId } = decodedToken; // Extraire l'ID utilisateur du token
        req.auth = {
            // Ajouter l'ID utilisateur à la requête
            userId, // Cela permettra à la route authentifiée d'accéder à l'ID utilisateur
        };
        next(); // Passer l'exécution à la prochaine fonction middleware
    } catch (error) {
        // Erreur d'authentification
        res.status(401).json({ error }); // Renvoyer une erreur
    }
};
