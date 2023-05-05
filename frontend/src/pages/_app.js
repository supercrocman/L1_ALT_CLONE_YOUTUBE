import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LeftMenu from '@/components/leftMenu';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App({ Component, pageProps }) {
    const [lastUrlPart, setLastUrlPart] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLastUrlPart(window.location.href.split('/')[3]);
        }
    }, []);

    const content = (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    );

    return lastUrlPart === 'studio' ? content : (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <LeftMenu>{content}</LeftMenu>
        </ThemeProvider>
    );
}