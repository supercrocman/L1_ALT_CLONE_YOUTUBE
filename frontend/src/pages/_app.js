import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </ThemeProvider>
    );
}
