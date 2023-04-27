import {
    Avatar,
    Button,
    CardMedia,
    Container,
    Divider,
    IconButton,
    Stack,
} from "@mui/material";
import {
    ChannelName,
    Description,
    LowerButton,
    UserCard,
} from "@/components/AuthorCard";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import TuneIcon from "@mui/icons-material/Tune";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const ChannelCard = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 0px",
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    paddingTop: "8px",
    paddingBottom: "8px",
}));

const ChannelNameVideo = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}));

const TitleLink = styled(Link)(({ theme }) => ({
    "&::visited": {
        color: theme.palette.text.primary,
    },
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
}));

const ThumbnailContainer = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.text.primary,
    position: "relative",
}));

const Timer = styled("span")(({ theme }) => ({
    position: "absolute",
    bottom: "6px",
    right: "6px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "4px",
    padding: "2px 4px",
    fontSize: "0.75rem",
    color: theme.palette.text.primary,
    fontWeight: "bold",
}));

const secondToTime = (duration) => {
    let seconds = parseInt(duration % 60);
    let minutes = parseInt((duration / 60) % 60);
    let hours = parseInt(duration / 3600);
    return `${hours > 0 ? hours + ":" : ""}${minutes > 0 ? minutes : "0"}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

const dateTimeToHowLongAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return "il y a " + interval + " ans";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return "il y a " + interval + " mois";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return "il y a " + interval + " jours";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return "il y a " + interval + " heures";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return "il y a " + interval + " minutes";
    }
    return "il y a " + Math.floor(seconds) + " secondes";
};

export const VideoCard = ({ video }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [time, setTime] = React.useState(secondToTime(video.duration));
    const [date, setDate] = React.useState(dateTimeToHowLongAgo(video.date));
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.preventDefault();
        // preventing any parent handlers from being notified of the event.
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    return (
        <Grid
            container
            spacing={2}
            sx={{
                mt: 0.5,
                mb: 0.5,
                "&:hover .MuiIconButton-root": {
                    display: "inline-flex",
                },
            }}
            onClick={() => router.push(`/video/${video.identifier}`)}
        >
            <Grid
                xs={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <ThumbnailContainer href={`/video/${video.identifier}`}>
                    <Timer>{time}</Timer>
                    <CardMedia
                        sx={{ borderRadius: "12px" }}
                        component="img"
                        image={video.thumbnail}
                        alt="Thumbnail"
                    />
                </ThumbnailContainer>
            </Grid>
            <Grid xs={7.5}>
                <Stack>
                    <ChannelName sx={{ marginBottom: 0.25 }}>
                        <TitleLink
                            href={`/video/${video.identifier}`}
                            color="inherit"
                            underline="none"
                        >
                            {video.title}
                        </TitleLink>
                    </ChannelName>
                    <Description sx={{ marginBottom: "4px", marginTop: "4px" }}>
                        {video.views} vues • {date}
                    </Description>
                    <ChannelCard>
                        <ChannelNameVideo
                            href={`/channel/@${video.author.identifier}`}
                        >
                            <Avatar
                                alt={video.author.name}
                                src={video.author.avatar}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    marginRight: "8px",
                                }}
                            />
                            {video.author.name}
                        </ChannelNameVideo>
                    </ChannelCard>
                    <Description>
                        {video.description.substring(0, 200)}...
                    </Description>
                </Stack>
            </Grid>
            <Grid xs={0.5}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "video-options" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    sx={{ display: open ? "inline-flex" : "none" }}
                >
                    <MoreVertIcon />
                </IconButton>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                id="video-options"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 0,
                        "& .MuiSvgIcon-root": {
                            ml: -0.5,
                            mr: 1,
                        },
                        bgcolor: "#282828",
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 11.35,
                            width: 10,
                            height: 10,
                            bgcolor: "#282828",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    {/* TODO: link to playlist */}
                    <AccessTimeIcon /> Enregistrer dans "À regarder plus tard"
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {/* TODO: link to playlist */}
                    <PlaylistAddIcon /> Enregistrer dans une playlist
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {/* TODO: link to share */}
                    <ReplyIcon sx={{ transform: "scaleX(-1)" }} /> Partager
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    {/* TODO: link to signal */}
                    <FlagIcon /> Signaler
                </MenuItem>
            </Menu>
        </Grid>
    );
};
