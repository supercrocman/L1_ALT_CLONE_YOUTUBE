import React, { use } from "react";
import Router from 'next/router';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import StudioLeftNavBar from '../../../components/studio/StudioLeftNavBar';
import axios from "axios";
import stringToColor from "@/utils/stringToColor";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from "@/components/studio/Dashboard";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function StudioPage() {

    const router = useRouter()
    const { id, page } = router.query
    const [user, setUser] = React.useState(null);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
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
    }, [page]);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const baseURL = 'http://localhost:3001/api/user/' + id.split("@")[1];
                try {
                    const response = await axios.get(baseURL)
                    response.data.user.avatarcolor = stringToColor(response.data.user.name)
                    setUser(response.data.user);
                    // console.log(response.data.user);
                } catch (error) {
                    console.log(error);
                }
            }

            fetchData();

            if (!id.startsWith("@")) {
                Router.push('/404');
            }
        }


    }, [id]);

    const renderPageContent = () => {
        switch (page) {
          case 'dashboard':
            return <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "64px" }}><Dashboard user={user} /></Box>;
          case 'commentaires':
            return "commentaires";
          case 'videos':
            return "videos";
          case 'playlists':
            return "playlists";
          case 'personnalisation':
            return "personnalisation";
          case 'paramètres':
            return "paramètres";
          case 'analytics':
            return "analytics";
          default:
            return null;
        }
      };

    return (
        <div>
            <StudioLeftNavBar user={user} page={page} />
            {renderPageContent()}
            {/* <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "64px" }}>
                <DrawerHeader />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box> */}
        </div>
    )
}