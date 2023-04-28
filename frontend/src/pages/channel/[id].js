import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { deepOrange } from '@mui/material/colors';
import AccountMenu from '../includes/accountmenu';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Home() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const router = useRouter()
    const { id } = router.query

    return (
        <div className={roboto.className}>
            <AccountMenu></AccountMenu>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginBottom: "25px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "25%" }}>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 128, height: 128, marginRight: "5%" }} alt="Remy Sharp" src="/broken-image.jpg" >R</Avatar>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-evenly", height: "100%" }}>
                        <p style={{}}>Remy Sharp</p>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", color: "#606060" }}>
                            <p style={{ marginRight: 8 }}>{id}</p>
                            <p style={{ marginRight: 8 }}>Aucun vidéo</p>
                            <p style={{ marginRight: 8 }}>Aucune abonné</p>
                        </div>
                        <Link href="#">Découvrir tout ces petits secrets </Link>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "25%", justifyContent: "space-evenly" }}>
                    {/* <Button variant="contained" style={{ borderRadius: "50px" }}>Personalize</Button> */}
                    <Fab color="primary" aria-label="Personalize" variant="extended" size='medium'>
                        Personalize
                    </Fab>
                </div>
            </div>
            <Box>
                <AppBar position="static" style={{ backgroundColor: "#000" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Home" {...a11yProps(0)} />
                        <Tab label="Videos" {...a11yProps(1)} />
                        <Tab label="Playlists" {...a11yProps(2)} />
                        <Tab label="About" {...a11yProps(3)} />
                        <Tab icon={<FavoriteIcon />} label="" {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        Empty
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        Empty
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </div>
    )
}