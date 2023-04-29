import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import stringToColor from '../../utils/stringToColor';
import Router from 'next/router';
import { useEffect } from 'react';
import AccountMenu from '../AccountMenu';
import Dashboard from './Dashboard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                    {/* <Typography>{children}</Typography> */}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function StudioLeftNavBar({ user, page }) {
    const [value, setValue] = React.useState(0);
    const [name, setName] = React.useState('');
    const [avatarColor, setAvatarColor] = React.useState('red');
    const [identifier, setIdentifier] = React.useState('');

    React.useEffect(() => {
        if (user) {
            setName(user.name)
            setAvatarColor(stringToColor(user.name))
            setIdentifier('@' + user.identifier)
        }

        if (page === "dashboard") {
            setValue(0);
        } else if (page === "commentaires") {
            setValue(3);
        } else if (page === "videos") {
            setValue(1);
        } else if (page === "playlists") {
            setValue(2);
        } else if (page === "personnalisation") {
            setValue(4);
        } else if (page === "paramètres") {
            setValue(5);
        } else if (page === "analytics") {
            setValue(6);
        }
    }, [user, page])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AccountMenu />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 171.87 }}>
                <Avatar alt={name} sx={{ bgcolor: avatarColor }} src="/broken-image.jpg" />
                <p style={{ marginRight: 8, fontWeight: "800" }}>{name}</p>
                <p style={{ marginRight: 8, color: "#606060" }}>{identifier}</p>
            </div>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "75%" }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab label="Dashboard" {...a11yProps(0)} onClick={() => Router.push('/studio/' + identifier + '/dashboard')} />
                    <Tab label="Videos" {...a11yProps(1)} onClick={() => Router.push('/studio/' + identifier + '/videos')} />
                    <Tab label="Playlists" {...a11yProps(2)} onClick={() => Router.push('/studio/' + identifier + '/playlists')} />
                    <Tab label="Commentaires" onClick={() => Router.push('/studio/' + identifier + '/commentaires')} />
                    <Tab label="Personnalisation" onClick={() => Router.push('/studio/' + identifier + '/personnalisation')} />
                    <Tab label="Paramètres" onClick={() => Router.push('/studio/' + identifier + '/paramètres')} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Dashboard user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Videos
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Playlists
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Commentaires
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Personnalisation
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Paramètres
                </TabPanel>
            </Box>
        </div>
    );
}
