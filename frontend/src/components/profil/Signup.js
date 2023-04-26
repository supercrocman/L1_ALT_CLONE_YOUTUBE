import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Popup from './Popup';
import axios from 'axios';

function Subscribe() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    function validateMDP(mdp) {
        var Reg = new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );
        return Reg.test(mdp);
    }
    async function saveUser(formData) {
        try {
            // {
            //     name: username,
            //     email: email,
            //     password: password,
            //     verified: 0,
            //     banned: 0
            //   }
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3001/profil/signup',
                data: formData,
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        let newErrors = {};
        const extensions = ['jpeg', 'jpg', 'png'];
        // Vérification du pseudo
        if (!username) {
            newErrors['p'] = true;
        }
        // Vérification de l'email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email) || email === '') {
            newErrors['e'] = true;
        }

        // Vérification du mot de passe
        if (password.length < 8 || !validateMDP(password)) {
            newErrors['m'] = true;
        }

        // Vérification de la confirmation du mot de passe
        if (password !== confirmPassword || !confirmPassword) {
            newErrors['cM'] = true;
        }
        const regexImage = /.(gif|jpg|jpeg|png|bmp)$/i;
        if (image && !regexImage.test(image.name)) {
            newErrors['i'] = true;
        }
        setErrors(newErrors);

        if (Object.entries(newErrors).length === 0) {
            // Envoyer le formulaire
            console.log('Formulaire envoyé !');
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('verified', 0);
            formData.append('banned', 0);
            console.log(formData);
            console.log(username);

            saveUser(formData);
        }
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Ouvrir Pop up
            </Button>
            <Popup open={open}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h2">Inscription</Typography>
                    <TextField
                        error={errors.i}
                        variant="filled"
                        type="file"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            console.log(e.target.files);
                        }}
                    />
                    <TextField
                        error={errors.p}
                        required
                        label="Pseudo"
                        variant="filled"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        error={errors.e}
                        label="Email"
                        variant="filled"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        error={errors.m}
                        label="Mot de passe"
                        variant="filled"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box>
                        <ul>
                            <li>Au moins 8 caractères</li>
                            <li>Un chiffre ou plus</li>
                            <li>Au moins une majuscule</li>
                            <li>Au moins un caractères spéciales</li>
                        </ul>
                    </Box>
                    <TextField
                        error={errors.cM}
                        required
                        type="password"
                        label="Confirmation mot de passe"
                        variant="filled"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>S'inscrire</Button>
                </Box>
            </Popup>
        </Box>
    );
}
export default Subscribe;
