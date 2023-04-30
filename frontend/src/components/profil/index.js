import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function Profil() {
    const [fenetre, setFenetre] = useState(1);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setFenetre(1);
        setOpen(false);
    }, []);
    return (
        <Box>
            <Button
                color="secondary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Se connecter
            </Button>
            {fenetre === 1 && (
                <Login
                    open={open}
                    setOpen={setOpen}
                    fenetre={fenetre}
                    setFenetre={setFenetre}
                />
            )}
            {fenetre === 0 && (
                <Signup
                    open={open}
                    setOpen={setOpen}
                    fenetre={fenetre}
                    setFenetre={setFenetre}
                />
            )}
        </Box>
    );
}
export default Profil;
