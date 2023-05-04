import React from 'react';
import { VideoCard } from './VideoCard';
import { styled } from '@mui/material/styles';

const NextVideoCard = styled('div')(({ theme }) => ({
    minWidth: 402,
}));

export const NextVideos = ({ videos }) => {
    const nextVideos = videos ? videos : Array(10).fill(false);
    return (
        <NextVideoCard>
            {nextVideos.map((video, i) => (
                <VideoCard key={i} video={video} small />
            ))}
        </NextVideoCard>
    );
};
