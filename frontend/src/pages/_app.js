import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import LeftMenu from "@/components/leftMenu";

import React from "react";


const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});


export default function App({ Component, pageProps }) {
    const [lastUrlPart, setLastUrlPart] = React.useState(null);



    React.useEffect(() => {
        if (typeof window === "undefined") {
            return;
        } else {
            setLastUrlPart(window.location.href.split("/")[3]);
        }
    }, []);


    if (lastUrlPart === "studio") {
        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <LeftMenu>
                <Component {...pageProps} />
            </LeftMenu>
        </ThemeProvider>
    );
}
