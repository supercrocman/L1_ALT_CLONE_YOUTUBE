/*Création de formulaire de connexion avec un mail unique et un mot de passe unique en pop-up */
import Popup from './Popup';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Login = ({ open, setOpen, setFenetre }) => {
    const [userMail, setuserMail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    async function handleSubmit(event) {
        event.preventDefault();
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
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        label="Email 📮"
                        id="outlined-size-small"
                        color="secondary"
                        size="small"
                        type="text"
                        value={userMail}
                        onChange={(e) => setuserMail(e.target.value)}
                    />
                    <TextField
                        label="Password 🥷"
                        id="outlined-size-small"
                        color="secondary"
                        size="small"
                        type="text"
                        value={userPassword}
                        onChange={(e) => setuserPassword(e.target.value)}
                    />
                    {error && <div>{error}</div>}
                    <Button
                        variant="contained"
                        color="primary"
                        href="#contained-buttons"
                        onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                    <Typography
                        variant="a"
                        onClick={() => {
                            setFenetre(0);
                        }}
                    >
                        Pas encore de compte ? Inscrivez-vous
                    </Typography>
                </Box>
            </Popup>
        </Box>
    );
};

export default Login;
