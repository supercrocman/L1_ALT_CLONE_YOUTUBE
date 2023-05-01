import { CardMedia, Divider, IconButton, Stack } from "@mui/material";
import { ChannelName, Description } from "@/components/AuthorCard";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AuthorName } from "./AuthorName";
import FlagIcon from "@mui/icons-material/Flag";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import { VideoVuesAndDate } from "./VideoVuesAndDate";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const TitleLink = styled(Link)(({ theme }) => ({
    "&::visited": {
        color: theme.palette.text.primary,
    },
    textDecoration: "none",
    lineHeight: "normal",
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

const ButtonContainer = styled("div")(({ theme }) => ({
    position: "absolute",
    right: 0,
}));

const secondToTime = (duration) => {
    let seconds = parseInt(duration % 60);
    let minutes = parseInt((duration / 60) % 60);
    let hours = parseInt(duration / 3600);
    return `${hours > 0 ? hours + ":" : ""}${minutes > 0 ? minutes : "0"}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

export const VideoCard = ({ video, small = false, vertical = false }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [time, setTime] = React.useState(secondToTime(video.length));

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
            spacing={!small && 2}
            sx={{
                mt: small ? 1 : 0.5,
                "&:hover .MuiIconButton-root": {
                    display: "inline-flex",
                },
                mr: vertical ? 1 : 0,
                maxWidth: vertical ? "21%" : "unset",
            }}
            flex={vertical && "1 0 21%"}
            onClick={() => router.push(`/watch/${video.identifier}`)}
            flexDirection={vertical ? "column" : "row"}
        >
            <Grid
                xs={vertical ? "" : small ? 5 : 4}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <ThumbnailContainer
                    sx={
                        small &&
                        !vertical && {
                            height: "94px",
                            width: "168px",
                        }
                    }
                    href={`/watch/${video.identifier}`}
                >
                    <Timer>{time}</Timer>
                    <CardMedia
                        sx={{ borderRadius: "12px" }}
                        component="img"
                        image={video.thumbnail}
                        alt="Thumbnail"
                    />
                </ThumbnailContainer>
            </Grid>
            <Grid
                display={vertical && "flex"}
                flexDirection={vertical && "row"}
                xs={vertical ? "" : small ? 6 : 7.5}
                sx={small && { pt: 1, pb: 1, pl: 1, pr: vertical ? "34px" : 0 }}
                position={vertical && "relative"}
            >
                <Stack>
                    <ChannelName sx={{ marginBottom: 0.25 }}>
                        <TitleLink
                            href={`/watch/${video.identifier}`}
                            color="inherit"
                            underline="none"
                            sx={
                                small && {
                                    display: "block",
                                    maxHeight: "2rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "normal",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                }
                            }
                        >
                            {video.title}
                        </TitleLink>
                    </ChannelName>

                    {vertical ? (
                        <VideoVuesAndDate video={video} />
                    ) : small ? (
                        <>
                            <AuthorName author={video.author} small />
                            <VideoVuesAndDate video={video} small />
                        </>
                    ) : (
                        <>
                            <VideoVuesAndDate video={video} />
                            <AuthorName author={video.author} />
                            <Description sx={{ cursor: "pointer" }}>
                                {video.description.substring(0, 200)}...
                            </Description>
                        </>
                    )}
                </Stack>
                {vertical && (
                    <ButtonContainer>
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
                    </ButtonContainer>
                )}
            </Grid>
            {!vertical && (
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
            )}
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
