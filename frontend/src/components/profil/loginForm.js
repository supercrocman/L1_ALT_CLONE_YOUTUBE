/*Création de formulaire de connexion avec un mail unique et un mot de passe unique en pop-up */
import Popup from "./Popup";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


  const LoginPage = () => { // Créer un composant de page de connexion, qui sera exporté à la fin du fichier

    const [open, setOpen] = React.useState(false) // Créer un état pour le popup, par défaut le popup est fermé

    const [userMail, setuserMail] = useState(''); // Créer un état pour l'adresse e-mail
    const [password, setPassword] = useState(''); // Créer un état pour le mot de passe
    const [error, setError] = useState(''); // Créer un état pour les erreurs


    async function handleSubmit(event) { // Gérer la soumission du formulaire
      event.preventDefault();
      console.log(userMail, password)// Empêcher le comportement par défaut du formulaire

      const response = await axios( { // Effectuer une requête POST pour vérifier l'authentification - axios est un client HTTP basé sur une promesse pour le navigateur et node.js
        method: 'POST', // Utiliser la méthode POST
        url: 'http://localhost:3001/profil/login', // L'URL de la route de connexion
        data: { userMail, password }, // Définir le corps de la requête
      });

      if (response.ok) {
        // Si les informations sont valides, rediriger l'utilisateur vers la page d'accueil
        router.push('/');
      } else {
        // Si les informations sont invalides, afficher un message d'erreur
        setError('Identifiants invalides');
      }
    }




    return (

      <form onSubmit={handleSubmit}>
        <label>
          Email address :
          <input type="text"  value={userMail} onChange={(e) => setuserMail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <div>{error}</div>}
        <button type="submit">LogIn</button>
        <button type="submit">Subscribe</button>

      </form>
    );
  };

  export default LoginPage;
