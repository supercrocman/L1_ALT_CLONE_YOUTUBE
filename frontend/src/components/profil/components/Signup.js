import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import Popup from './Popup';
import axios from 'axios';

function Signup({ open, setOpen, setFenetre }) {
    const [data, setData] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [errorFetch, setErrorFetch] = useState({});

    function validateMDP(mdp) {
        const Reg = new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );
        return Reg.test(mdp);
    }
    async function saveUser(formData) {
        try {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3001/profil/signup',
                data: formData,
            });
            setData(result);
            setErrorFetch({});
        } catch (e) {
            console.log(e);
            setErrorFetch({
                message: "il y a eu un problème lors de l'inscription.",
            });
        } finally {
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({});
        setErrors({});
        let newErrors = {};
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
            const formData = new FormData();
            if (image) {
                const newNameImage = image.name.split(' ').join('_');
                formData.append('image', image, newNameImage);
            }
            formData.append('name', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('verified', 0);
            formData.append('banned', 0);
            saveUser(formData);
        }
    };

    return (
        <Box>
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
                >
                    <Typography variant="h2">Inscription</Typography>
                    <Box
                        sx={{
                            backgroundColor: '#BA55D3',
                            width: 250,
                            height: 10,
                            marginBottom: 5,
                        }}
                    ></Box>
                    {Object.entries(data).length !== 0 ||
                    Object.entries(errorFetch).length !== 0 ? (
                        <Alert
                            color={
                                Object.entries(data).length !== 0
                                    ? 'success'
                                    : 'error'
                            }
                        >
                            {Object.entries(data).length !== 0
                                ? data.data.message
                                : errorFetch.message}
                        </Alert>
                    ) : null}
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={3}
                        sx={{ marginBottom: 2 }}
                    >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                sx={{ margin: '5px  0' }}
                                color="secondary"
                                error={errors.i}
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    console.log(e.target.files);
                                }}
                            />
                            <TextField
                                sx={{ margin: '5px  0' }}
                                color="secondary"
                                error={errors.p}
                                required
                                label="Pseudo"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                sx={{ margin: '5px  0' }}
                                required
                                color="secondary"
                                error={errors.e}
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={3}
                            sx={{ width: '300px' }}
                        >
                            <Accordion
                                sx={{ margin: '5px  0', minHeight: '55px' }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        Critères mot de passe
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <li>Au moins 8 caractères</li>
                                        <li>Un chiffre ou plus</li>
                                        <li>Au moins une majuscule</li>
                                        <li>Au moins un caractère spéciale</li>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <TextField
                                sx={{ margin: '5px  0' }}
                                required
                                error={errors.m}
                                color="secondary"
                                label="Mot de passe"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                sx={{ margin: '5px  0' }}
                                error={errors.cM}
                                required
                                color="secondary"
                                type="password"
                                label="Confirmation mot de passe"
                                autoComplete="off"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </Stack>
                    </Stack>
                    <Button onClick={handleSubmit} color="secondary">
                        S'inscrire
                    </Button>
                </Box>
                <Typography
                    variant="a"
                    onClick={() => {
                        setFenetre(1);
                    }}
                >
                    Déjà inscrit ? Se connecter
                </Typography>
            </Popup>
        </Box>
    );
}
export default Signup;
