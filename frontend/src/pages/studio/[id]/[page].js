import React, { use } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Content from "@/components/studio/Content";
import Upload from "@/components/studio/Upload";
import Dashboard from "@/components/studio/Dashboard";
import Router from "next/router";
import StudioLeftNavBar from "../../../components/studio/StudioLeftNavBar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import stringToColor from "@/utils/stringToColor";
import { useEffect } from "react";
import { useRouter } from "next/router";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function StudioPage() {
    const router = useRouter();
    const { id, page } = router.query;
    const [user, setUser] = React.useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const baseURL =
                    "http://localhost:3001/api/user/" + id.split("@")[1];
                try {
                    const response = await axios.get(baseURL);
                    response.data.user.avatarcolor = stringToColor(
                        response.data.user.name
                    );
                    setUser(response.data.user);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();

            if (!id.startsWith("@")) {
                Router.push("/404");
            }
        }
    }, [id]);

    const renderPageContent = () => {
        switch (page) {
            case "dashboard":
                return <Dashboard user={user} />;
            case "commentaires":
                return "commentaires";
            case "content":
                return <Content user={user} />;
            case 'upload':
                return <Upload user={user} />;
            case "playlists":
                return "playlists";
            case "personnalisation":
                return "personnalisation";
            case "paramètres":
                return "paramètres";
            case "analytics":
                return "analytics";
            default:
                return <Dashboard user={user} />;
        }
    };

    return (
        <div>
            <StudioLeftNavBar user={user} page={page} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: "64px",
                    paddingTop: "64px",
                }}
            >
                {renderPageContent()}
            </Box>
        </div>
    );
}
