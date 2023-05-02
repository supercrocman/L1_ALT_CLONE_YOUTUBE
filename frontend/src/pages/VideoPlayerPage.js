import React from "react";
import { Player } from "../component/Player";
import VideoComments from "../component/VideoComments";
import VideoInformation from "../component/VideoInformation";
import { styled } from "@mui/material/styles";

export default function VideoPlayerPage() {
    // const styles = {
    //     background: "#121212",
    //     height: "100vh",
    //     width: "100vw",
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     display: "flex",
    //     }
    return (
            <div style={styled}>
                <Player></Player >
                <VideoComments />
                {/*<VideoInformation />*/}
            </div>
        );
}
