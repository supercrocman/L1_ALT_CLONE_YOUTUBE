import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";

import { CleanLink } from "./AuthorCard";
import React from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { dateTimeToHowLongAgo } from "./VideoVuesAndDate";

const VideoInformation = ({ video }) => {
    const [date, setDate] = React.useState(
        dateTimeToHowLongAgo(video.uploaded_at)
    );
    return (
        <Box sx={{ mt: "12px" }}>
            <Typography variant="h6" component="h1">
                {video.title}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        mt: "12px",
                        mr: "24px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CleanLink href={`/channel/@${video.author.identifier}`}>
                        <Avatar
                            alt={video.author.name}
                            src={video.author.avatar}
                            sx={{
                                width: 40,
                                height: 40,
                                marginRight: "8px",
                            }}
                        />
                    </CleanLink>
                    <Box>
                        {/* name of the author */}
                        <CleanLink
                            href={`/channel/@${video.author.identifier}`}
                        >
                            <Typography
                                variant="subtitle2"
                                component="h3"
                                sx={{
                                    fontWeight: "bold",
                                    color: "text.secondary",
                                    "&:hover": {
                                        color: "text.primary",
                                    },
                                }}
                            >
                                {video.author.name}
                            </Typography>
                        </CleanLink>
                        {/* number of subscribers */}
                        <Typography
                            variant="subtitle2"
                            component="h4"
                            sx={{ color: "text.secondary" }}
                        >
                            {video.author.subCount} abonnés
                        </Typography>
                    </Box>
                    {/* Subscribe button */}
                    <Button variant="contained" sx={{ ml: 2 }}>
                        S'abonner
                    </Button>
                </Box>
                <Box
                    sx={{
                        mt: "12px",
                        mr: "12px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {/* number of like and dislike in a button divided in a chip style*/}
                    <ButtonGroup variant="outlined" color="primary">
                        <Button>
                            <ThumbUpOffAltIcon />
                            <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                    ml: 1,
                                }}
                            >
                                {video.upvote}
                            </Typography>
                        </Button>
                        <Button>
                            <ThumbDownOffAltIcon />
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
            {/* box with wallpaper contain vues and date + description */}
            <Box
                sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "8px",
                    padding: "12px",
                    mt: "12px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {/* number of vues */}
                    <Typography
                        variant="body2"
                        component="span"
                        sx={{
                            color: "text.primary",
                            fontWeight: "bold",
                        }}
                    >
                        {video.views} vues
                    </Typography>
                    {/* date of the video */}
                    <Typography
                        variant="body2"
                        component="span"
                        sx={{
                            color: "text.primary",
                            ml: 1,
                            fontWeight: "bold",
                        }}
                    >
                        {date}
                    </Typography>
                </Box>
                {/* description of the video */}
                <Typography
                    variant="body2"
                    component="span"
                    sx={{
                        color: "text.primary",
                    }}
                >
                    {video.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default VideoInformation;
