/*Création de formulaire de connexion avec un mail unique et un mot de passe unique en pop-up */
import Popup from './Popup';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, Stack, Typography } from '@mui/material';
import profilStyles from '../../../styles/profil.module.css';

const Login = ({ open, setOpen, setFenetre }) => {
    const [userMail, setuserMail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3001/profil/login',
                data: { userMail, userPassword },
            });

            if (response.data) {
                setCookie('user', JSON.stringify(response.data), { path: '/' });
                setOpen(false);
                console.log(response.data);
            } else {
                setError('Identifiants invalides');
            }
        } catch (error) {
            console.log(error);
            setError('Identifiants invalides, veuillez réessayer');
        }
    }

    return (
        <Box sx={{ justifyContent: 'space-between' }}>
            <Popup open={open} setOpen={setOpen} setFenetre={setFenetre}>
                <Box
                    className={`${profilStyles.profilContainer}`}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h2">Connexion</Typography>
                    <Box
                        className={`${profilStyles.profilBar} ${profilStyles.profilBar_inscription_connexion}`}
                    ></Box>
                    <Stack spacing={3} sx={{ marginBottom: 2 }}>
                        {error !== '' && <Alert color="error">{error}</Alert>}

                        <TextField
                            label="Email 📮"
                            color="secondary"
                            type="text"
                            value={userMail}
                            onChange={(e) => setuserMail(e.target.value)}
                        />
                        <TextField
                            label="Password 🥷"
                            color="secondary"
                            type="password"
                            value={userPassword}
                            autoComplete="off"
                            onChange={(e) => setuserPassword(e.target.value)}
                        />
                    </Stack>

                    <Button color="secondary" onClick={handleSubmit}>
                        Se connecter
                    </Button>
                </Box>
                <Typography
                    variant="a"
                    className={`${profilStyles.lien}`}
                    onClick={() => {
                        setFenetre(0);
                    }}
                >
                    Pas encore de compte ? Inscrivez-vous
                </Typography>
            </Popup>
        </Box>
    );
};

export default Login;
