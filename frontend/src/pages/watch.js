import { Box, Container } from "@mui/material";

import { NextVideos } from "@/components/NextVideos";
import React from "react";
import VideoComments from "../components/VideoComments";
import VideoInformation from "../components/VideoInformation";
import { VideoJS } from "../components/Player";
import { styled } from "@mui/material/styles";

const relatedVideos = [
    {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnail:
            "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
        views: 1000,
        duration: 232323,
        uploaded_at: "2023-02-10",
        identifier: "fivzrehihuy",
        upvote: 1000,
        author: {
            name: "John Doe",
            avatar: "/images/avatar.jpg",
            subCount: 1000,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            identifier: "johndoe",
        },
    },
    {
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        thumbnail:
            "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
        views: 1000,
        length: 232323,
        uploaded_at: "2023-02-10",
        identifier: "fivzrehihuy",
        author: {
            name: "John Doe",
            avatar: "/images/avatar.jpg",
            subCount: 1000,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            identifier: "johndoe",
        },
    },
];

export default function VideoPlayerPage() {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: false,
        fill: true,
        sources: [
            {
                src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                type: "video/mp4",
            },
        ],
        poster: "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
    };

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Container>
                <VideoJS options={videoJsOptions} />
                <VideoInformation video={relatedVideos[0]} />
                {/* <VideoComments /> */}
            </Container>
            <NextVideos videos={relatedVideos} />
        </Box>
    );
}
