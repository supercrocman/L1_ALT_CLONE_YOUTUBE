import React from 'react'
import { VideoPlayer } from '@videojs-player/react'
import 'video.js/dist/video-js.css'

export const Player = () => {
    return (
        <VideoPlayer
            src="static/videos/rick.mp4"
            poster="/your-path/poster.jpg"
            controls
            loop={false}
            volume={1}
            // more props...

            // more events...
        />
    )
}
