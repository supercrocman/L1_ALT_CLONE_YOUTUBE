import { Box, CircularProgress, Container } from '@mui/material';

import { NextVideos } from '@/components/NextVideos';
import React from 'react';
import VideoComments from '../components/VideoComments';
import VideoInformation from '../components/VideoInformation';
import { VideoJS } from '../components/Player';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

export default function VideoPlayerPage() {
    // use router
    const router = useRouter();
    // get video id
    const { v } = router.query;
    const [video, setVideo] = React.useState(null);
    const [relatedVideos, setRelatedVideos] = React.useState(null);
    const [videoJsOptions, setvideoJsOptions] = React.useState({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: false,
        fill: true,
    });
    React.useEffect(() => {
        const getRelatedVideos = async (v) => {
            if (!v) return;
            setVideo(null);
            setRelatedVideos(null);
            try {
                const vid = await axios.get(
                    `http://localhost:3001/api/video/${v}`
                );
                setVideo(vid.data);
                setvideoJsOptions({
                    ...videoJsOptions,
                    sources: [
                        {
                            src: vid.data.path,
                            type: 'video/mp4',
                        },
                    ],
                    poster: vid.data.thumbnail,
                });
                const res = await axios.get(
                    `http://localhost:3001/api/video/${v}/related`
                );
                setRelatedVideos(res.data);
            } catch (e) {
                router.push('/404');
            }
        };
        getRelatedVideos(v);
    }, [v]);
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            {video ? (
                <Container>
                    <VideoJS options={videoJsOptions} />
                    <VideoInformation video={video} />
                </Container>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {/* <VideoComments /> */}
            <NextVideos videos={relatedVideos} />
        </Box>
    );
}
