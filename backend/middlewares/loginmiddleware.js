// Rechercher l'utilisateur dans la base de données

async function login(req, res) {
    // Récupérer les informations de connexion depuis la requête
    const { userMail, password } = req.body;
    console.log(userMail, password);

    res.status(200).json({ message: 'ok' });
}
module.exports = login;


// faire une recherche dans la base de donnée pour trouver l'email, s'il trouve l'email, il va comparer le mot de passe avec celui de la base de donnée, si le mot de passe est correct, il va créer un token et le renvoyer au front-end, sinon il va renvoyer une erreur avec un message :
