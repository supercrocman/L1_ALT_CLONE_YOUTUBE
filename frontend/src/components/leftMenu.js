import * as React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import AccountMenu from '@/components/AccountMenu';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SearchBar from '@/components/SearchBar';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Profil from './profil';
import axios from "axios";
import AccessTime from '@mui/icons-material/AccessTime';
import { ListSubheader } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [subscribes, setSubscribes] = useState(null);
    useEffect(() => {
        const func = async () => {
            if (subscribes === null) {
                try {
                    const response = await axios.get(
                        "http://localhost:3001/api/user/user1/subscriptions"
                    );
                    setSubscribes(response?.data?.subscriptions);
                } catch (error) {
                    console.log(error);
                }
            }
            const params = new URLSearchParams(window.location.search);
            const searchQuery = params.get("search_query");
            setSearchQuery(searchQuery);
        };
        func();
    }, [subscribes]);
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const router = useRouter();
    const sQ = router.query?.search_query;
    useEffect(() => {
        if (router.pathname === '/watch') setOpen(false);
        if (sQ) setSearchQuery(sQ);
    }, [router.pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" noWrap component="h1">
                            WATCHSPACE
                        </Typography>
                        <SearchBar defaultValue={searchQuery} />
                        <Profil></Profil>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: "Accueil", icon: <HomeIcon />, href: "/" },
                        {
                            text: "Abonnements",
                            icon: <SubscriptionsIcon />,
                            href: "/subscriptions",
                        },
                        {
                            text: "Vos vidéos",
                            icon: <OndemandVideoIcon />,
                            href: "/studio/@user1/content/videos",
                        },
                    ].map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[
                        {
                            text: "Historique",
                            icon: <HistoryIcon />,
                            href: "/feed/history",
                        },
                        {
                            text: "Regarder plus tard",
                            icon: <AccessTime />,
                            href: "/playlist?list=WL",
                        },
                        {
                            text: `Vidéos "J'aime"`,
                            icon: <ThumbUpIcon />,
                            href: "/playlist?list=LL",
                        },
                    ].map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
                {open && (
                    <>
                        <Divider />
                        <List
                            aria-labelledby="Abonnements"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="Abonnements-subheader"
                                >
                                    Abonnements
                                </ListSubheader>
                            }
                        >
                            {subscribes &&
                                subscribes.map((item) => (
                                    <ListItem
                                        key={item.identifier}
                                        disablePadding
                                        sx={{ display: "block" }}
                                    >
                                        <Link
                                            href={`/channel/${item.identifier}`}
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "initial",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        alt={item.name}
                                                        src={item.avatar}
                                                        sx={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.name}
                                                    sx={{
                                                        display: "block",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                        whiteSpace: "normal",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: "1",
                                                        WebkitBoxOrient:
                                                            "vertical",
                                                        opacity: 1,
                                                    }}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                ))}
                        </List>
                    </>
                )}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
