import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import LeftMenu from "@/components/leftMenu";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />            
            <LeftMenu>
            <Component {...pageProps} />
            </LeftMenu>
        </ThemeProvider>
    );
}
