import React from 'react'
import 'video.js/dist/video-js.css'

export const Player = () => {
    return (
        <div>
            <video width="100%" height="100%" controls  src="\static\videos\rick.mp4"/>
        </div>
    )
}