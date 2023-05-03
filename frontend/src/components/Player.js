import "video.js/dist/video-js.css";

import { Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import videojs from "video.js";

const VideoContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 480,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    "& .vjs-control-bar": {
        backgroundColor: "rgba(0,0,0,0.5) !important",
        fontSize: "1.4em",
    },
    // responsive
    [theme.breakpoints.down("md")]: {
        height: 360,
    },
    [theme.breakpoints.down("sm")]: {
        height: 240,
    },
    [theme.breakpoints.down("xs")]: {
        height: 180,
    },
}));

export const VideoJS = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    onReady && onReady(player);
                }
            ));

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
            player.poster(options.poster);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <VideoContainer ref={videoRef} />
        </div>
    );
};

export default VideoJS;
