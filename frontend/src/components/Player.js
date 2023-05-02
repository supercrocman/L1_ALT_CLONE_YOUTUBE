import React from 'react'
import { VideoPlayer } from '@videojs-player/react'
import 'video.js/dist/video-js.css'

export const Player = () => {
    return (
        <VideoPlayer
            src="static/videos/rick.mp4"
            poster="/your-path/poster.jpg"
            controls = {true}
            loop={false}
            volume={1}
            width={600}
            borderRadius={25}
            height={300}
            marginTop={50}
        />

    )
}
