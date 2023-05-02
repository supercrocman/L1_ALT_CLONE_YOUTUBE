import React from "react";
import { Player } from "../components/Player";
import VideoComments from "../components/VideoComments";
import VideoInformation from "../components/VideoInformation";
import { Container } from "@mui/material";

export default function VideoPlayerPage() {
    return (
            <div>
                <Container/>
                <Player></Player>
                <VideoComments />
                {/*<VideoInformation />*/}
            </div>
    );
}