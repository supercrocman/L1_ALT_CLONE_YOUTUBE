import React from "react";
import { VideoCard } from "./VideoCard";
import { styled } from "@mui/material/styles";

const NextVideoCard = styled("div")(({ theme }) => ({
    maxWidth: 402,
}));

export const NextVideos = ({ videos }) => {
    return (
        <NextVideoCard>
            {videos.map((video, i) => (
                <VideoCard key={i} video={video} small />
            ))}
        </NextVideoCard>
    );
};
