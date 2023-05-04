import Popup from './Popup';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
    Alert,
    FormControlLabel,
    Stack,
    Switch,
    Typography,
} from '@mui/material';
import profilStyles from '../../../styles/profil.module.css';
import axiosInstance from '@/utils/axiosInterceptor';
import { setCookie } from 'cookies-next';

const Login = ({ open, setOpen, setFenetre }) => {
    const [userMail, setuserMail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: '/profil/login',
                data: { userMail, userPassword, remember },
            });
            if (response?.data) {
                setOpen(false);
                setCookie('isLoggIn', true);
                setCookie('remember', remember);
            } else {
                setError('Identifiants invalides');
            }
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message);
        } finally {
            setRemember(true);
        }
    }

    return (
        <Box sx={{ justifyContent: 'space-between' }}>
            <Popup open={open} setOpen={setOpen} setFenetre={setFenetre}>
                <Box
                    className={profilStyles.profilContainer}
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
                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked
                                onChange={() => {
                                    setRemember((o) => !o);
                                }}
                            />
                        }
                        label="Se souvenir de moi"
                    />
                </Box>
                <Typography
                    variant="a"
                    className={profilStyles.lien}
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
