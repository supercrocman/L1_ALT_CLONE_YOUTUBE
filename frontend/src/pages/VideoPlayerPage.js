import React from "react";
import { Player } from "../component/Player";
import VideoComments from "../component/VideoComments";
import VideoInformation from "../component/VideoInformation";

export default function VideoPlayerPage() {
    const styles = {
        background: "linear-gradient(119deg, rgba(36,0,23,1) 0%, rgba(105,9,121,1) 26%, rgba(209,0,255,1) 100%);",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
    };

    return (
        <div style={styles}>
            <Player></Player>
            {/*<VideoComments />*/}
            {/*<VideoInformation />*/}
        </div>
    );
}
