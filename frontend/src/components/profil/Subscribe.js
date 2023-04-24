import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Popup from './Popup';

function Subscribe() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Ouvrir Pop up
            </Button>
            <Popup open={open} handleClose={handleClose}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h2">Inscription</Typography>
                    <TextField label="Pseudo" variant="filled" />
                    <TextField label="Email" variant="filled" />
                    <TextField label="Mot de passe" variant="filled" />
                    <TextField
                        label="Confirmation mot de passe"
                        variant="filled"
                    />
                    <Button onClick={handleClose}>S'inscrire</Button>
                </Box>
            </Popup>
        </Box>
    );
}
export default Subscribe;
