import React from "react";
import { Player } from "../component/Player";
import VideoComments from "../component/VideoComments";
import VideoInformation from "../component/VideoInformation";
import { Container } from "@mui/material";

export default function VideoPlayerPage() {
    return (
            <div>
                <Container/>
                <Player/>
                <VideoComments />
                {/*<VideoInformation />*/}
            </div>
    );
}
