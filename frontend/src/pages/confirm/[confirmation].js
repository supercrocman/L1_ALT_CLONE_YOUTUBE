import axiosInstance from '@/utils/axiosInterceptor';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import profilStyles from '../../styles/profil.module.css';

function Confirmation() {
    const [data, setData] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setError(false);
        async function fetchData() {
            try {
                if (!router.isReady) {
                    return;
                }
                const { confirmation } = router.query;
                const result = await axiosInstance({
                    method: 'get',
                    url: `/profil/verify/${confirmation}`,
                });
                setData(result);
            } catch (e) {
                console.log(e);
                setError(true);
            }
        }
        fetchData();
    }, [router.isReady]);

    return (
        <>
            <Box className={`${profilStyles.profilContainer}`}>
                <Paper
                    sx={{
                        padding: 20,
                        maxWidth: 800,
                    }}
                    className={`${profilStyles.profilContainer}`}
                >
                    <h1>
                        {error ? 'Sorry...😅' : 'Compte confirmé et validé!'}
                    </h1>
                    <Box
                        className={`${profilStyles.profilBar} ${profilStyles.profilBar_confirmation}`}
                    ></Box>
                    <Typography>
                        {error
                            ? 'On a un problème avec votre email. Veuillez vous réinscrire.'
                            : "Il ne te reste plus qu'à te connecter.😉"}
                    </Typography>

                    <Link href="/">
                        <Button color="secondary">Page d'accueil</Button>
                    </Link>
                </Paper>
            </Box>
        </>
    );
}
export default Confirmation;
