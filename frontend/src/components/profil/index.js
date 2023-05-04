import axiosInstance from '@/utils/axiosInterceptor';
import { Box, Button } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import AccountMenu from '../AccountMenu';
import Login from './components/Login';
import Signup from './components/Signup';
import { useRouter } from 'next/router';
import handleLogout from '@/utils/handleLogout';

function Profil() {
    const [fenetre, setFenetre] = useState(1);
    const [open, setOpen] = useState(false);
    const [showProfil, setShowProfil] = useState(false);
    const router = useRouter();
    // const handleLogout = async () => {
    //     setCookie('isLoggIn', false);
    //     setShowProfil(!!getCookie('isLoggIn'));
    //     await clear();
    //     router.push('/');
    // };
    // async function clear() {
    //     try {
    //         await axiosInstance.get('/profil/logout');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    async function handleLogout (){
        setCookie('isLoggIn', false);
        setShowProfil(!!getCookie('isLoggIn'));
        await clear();
        router.push('/');
    };
    async function clear() {
        try {
            await axiosInstance.get('/profil/logout');
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        setFenetre(1);
        setOpen(false);
        const handleBeforeUnload = () => {
            if (getCookie('remember') !== null) {
                if (!getCookie('remember')) {
                    handleLogout();
                }
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        setShowProfil(!!getCookie('isLoggIn'));
    }, [getCookie('isLoggIn')]);
    return showProfil ? (
        <Box>
            <AccountMenu handleLogout={handleLogout} />
        </Box>
    ) : (
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
