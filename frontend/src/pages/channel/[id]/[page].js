import AccountMenu from '../../../components/AccountMenu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Roboto } from 'next/font/google';
import Router from 'next/router';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { VideoCard } from '../../../components/VideoCard';
import { deepOrange } from '@mui/material/colors';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '@/utils/axiosInterceptor';
import stringToColor from '@/utils/stringToColor';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});

var about = '';

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
                    {children}
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

export default function ChannelPage({ user }) {
    const theme = useTheme();

    const router = useRouter();
    const { id, page } = router.query;
    useEffect(() => {
        if (id === undefined) {
            // Ne faites rien si id n'est pas encore défini
            return;
        }

        if (!id.startsWith('@')) {
            Router.push('/404');
        }
    }, [id]);

    let baseindex = 0;

    const [value, setValue] = React.useState(baseindex);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [subscribers, setSubscribers] = React.useState(0);
    const [videoCount, setVideoCount] = React.useState(0);
    const [videos, setVideos] = React.useState([]);
    const [avatar, setAvatar] = React.useState('');
    const [date, setDate] = React.useState('');

    useEffect(() => {
        if (page === 'home') {
            baseindex = 0;
        } else if (page === 'about') {
            baseindex = 3;
        } else if (page === 'videos') {
            baseindex = 1;
        } else if (page === 'playlists') {
            baseindex = 2;
        } else if (page === 'likes') {
            baseindex = 4;
        }

        setValue(baseindex);
    }, [page]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                // const baseURL = '/api/user/' + id;
                const baseURL = '/api/user/' + id.split('@')[1];
                try {
                    const response = await axiosInstance.get(baseURL);
                    setName(response.data['user'].name);
                    setDescription(response.data['user'].description);
                    setSubscribers(response.data['user']['subCount']);
                    setVideoCount(response.data['user']['videoCount']);
                    setAvatar(response.data['user']['avatar']);
                    setVideos(response.data['user']['videos']);
                } catch (error) {
                    console.log(error.response.data);
                    if (error.response.data === 'User not found') {
                        Router.push('/404');
                    }
                }
            }
        };

        fetchData();
    }, [id, page]);

    return (
        <div className={roboto.className}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    marginBottom: '25px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '25%',
                    }}
                >
                    <Avatar
                        alt={name}
                        sx={{
                            bgcolor: stringToColor(name),
                            width: 128,
                            height: 128,
                            marginRight: '5%',
                        }}
                        src={avatar ? avatar : null}
                    >
                        {avatar ? null : name ? name.split('')[0] : null}
                    </Avatar>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            justifyContent: 'space-evenly',
                            height: '100%',
                        }}
                    >
                        <p>{name}</p>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                color: '#606060',
                                fontSize: 'small',
                            }}
                        >
                            <p style={{ marginRight: 8, fontWeight: '800' }}>
                                {id}
                            </p>
                            <p style={{ marginRight: 8 }}>{videoCount} vidéo</p>
                            <p style={{ marginRight: 8 }}>
                                {subscribers} abonné
                            </p>
                        </div>
                        <Link href={'/channel/' + id + '/about'}>
                            {description && description.length > 0
                                ? description.substring(0, 20)
                                : ''}
                        </Link>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '25%',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Fab
                        color="primary"
                        aria-label="Personalize"
                        variant="extended"
                        size="medium"
                        onClick={() => Router.push(`/studio/${id}`)}
                    >
                        Personalize
                    </Fab>
                </div>
            </div>
            <Box>
                <AppBar
                    position="static"
                    style={{ backgroundColor: '#000' }}
                    color="primary"
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        centered
                    >
                        <Tab
                            label="Home"
                            {...a11yProps(0)}
                            onClick={() =>
                                Router.push('/channel/' + id + '/home')
                            }
                        />
                        <Tab
                            label="Videos"
                            {...a11yProps(1)}
                            onClick={() =>
                                Router.push('/channel/' + id + '/videos')
                            }
                        />
                        <Tab
                            label="Playlists"
                            {...a11yProps(2)}
                            onClick={() =>
                                Router.push('/channel/' + id + '/playlists')
                            }
                        />
                        <Tab
                            label="About"
                            {...about}
                            {...a11yProps(3)}
                            onClick={() =>
                                Router.push('/channel/' + id + '/about')
                            }
                        />
                        <Tab
                            icon={<FavoriteIcon />}
                            label=""
                            {...a11yProps(4)}
                            onClick={() =>
                                Router.push('/channel/' + id + '/likes')
                            }
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid container justifyContent={'center'}>
                        {videos.map((video, i) => {
                            video = {
                                thumbnail: video.thumbnail,
                                title: video.title,
                                views: video.views,
                                date: video.uploaded_at,
                                duration: video.length,
                                identifier: video.identifier,
                                description: video.description,
                                author: {
                                    name: name,
                                    avatar: avatar,
                                    subCount: subscribers,
                                    description: description,
                                    identifier: id.split('@')[1],
                                },
                            };
                            return (
                                <VideoCard
                                    key={'card' + i}
                                    video={video}
                                    small
                                    vertical
                                />
                            );
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Empty
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    {description}
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    Empty
                </TabPanel>
            </Box>
        </div>
    );
}
