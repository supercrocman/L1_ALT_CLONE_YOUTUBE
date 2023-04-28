/*Création de formulaire de connexion avec un mail unique et un mot de passe unique en pop-up */
import Popup from "./Popup";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import TextField  from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";





  const LoginPage = () => { // Créer un composant de page de connexion, qui sera exporté à la fin du fichier

    const [open, setOpen] = React.useState(false) // Créer un état pour le popup, par défaut le popup est fermé

    const [userMail, setuserMail] = useState(''); // Créer un état pour l'adresse e-mail
    const [userPassword, setuserPassword] = useState(''); // Créer un état pour le mot de passe
    const [error, setError] = useState(''); // Créer un état pour les erreurs

    const [cookies, setCookie, removeCookie] = useCookies(['user']);



    async function handleSubmit(event) { // Gérer la soumission du formulaire
      event.preventDefault();
      console.log(userMail, userPassword)// Empêcher le comportement par défaut du formulaire

      try {
        const response = await axios( { // Effectuer une requête POST pour vérifier l'authentification - axios est un client HTTP basé sur une promesse pour le navigateur et node.js
          method: 'POST', // Utiliser la méthode POST
          url: 'http://localhost:3001/profil/login', // L'URL de la route de connexion
          data: { userMail, userPassword }, // Définir le corps de la requête
        });

        if (response.data) {
          // Si les informations sont valides, rediriger l'utilisateur vers la page d'accueil
          setCookie('user', JSON.stringify(response.data), { path: '/' });
          setOpen(false);

        } else {
          // Si les informations sont invalides, afficher un message d'erreur
          setError('Identifiants invalides');
        }
      } catch (error) {
        console.log(error);
        // créer un état pour les erreurs et aficher un message d'erreur

          setError('Identifiants invalides, veuillez réessayer');



        //setError('Identifiants invalides');

        // quand le user est connecté, on ferme la popop

      }
    }

    return (

      <Box sx={{ justifyContent: 'space-between' }}>


      <button onClick={() => setOpen(o => !o)}>coucou</button>,

      <Popup open={open}>
        <form onSubmit={handleSubmit}>
          <label>

            <TextField
             label="Email 📮"
             id="outlined-size-small"
             color="secondary"
             size="small"
             type="text" value={userMail} onChange={(e) => setuserMail(e.target.value)} />
          </label>
          <label>

            <TextField
             label="Password 🥷"
             id="outlined-size-small"
             color="secondary"
             size="small"
             type="text" value={userPassword} onChange={(e) => setuserPassword(e.target.value)} />
          </label>
          {error && <div>{error}</div>}
          <Button variant="contained" color="primary" href="#contained-buttons"> Log In </Button>
          <Button variant="contained" color="primary" href="#contained-buttons"> Subscribe </Button>
        </form>
      </Popup>
      </Box>
      );

  };

  export default LoginPage;
