import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Router, { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosInterceptor';
import { Roboto } from 'next/font/google';
import { deepOrange } from '@mui/material/colors';
import stringToColor from '@/utils/stringToColor';
import { setCookie } from 'cookies-next';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = React.useState({});
    const router = useRouter();

     async function handleLogout (){
            setCookie('isLoggIn', false);
            // setShowProfil(!!getCookie('isLoggIn'));
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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/profil/user');
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        return () => {
            fetchData();
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <React.Fragment>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: user.name
                                        ? stringToColor(user.name)
                                        : deepOrange[500],
                                }}
                                alt={user.name}
                                src={user.avatar ? user.avatar : null}
                            >
                                {user.avatar
                                    ? null
                                    : user.name
                                    ? user.name.split('')[0]
                                    : null}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 45,
                                height: 45,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 15,
                                height: 15,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem
                        onClick={() =>
                            Router.push(`/channel/@${user.identifier}/home`)
                        }
                    >
                        <Avatar
                            sx={{
                                bgcolor: user.name
                                    ? stringToColor(user.name)
                                    : deepOrange[500],
                            }}
                            alt={user.name}
                            src={user.avatar ? user.avatar : null}
                        >
                            {user.avatar
                                ? null
                                : user.name
                                ? user.name.split('')[0]
                                : null}
                        </Avatar>
                        {user.name ? user.name : null}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleLogout();
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </Box>
    );
}
