import { Description } from "@/components/AuthorCard";
import React from "react";

const dateTimeToHowLongAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return "il y a " + interval + " ans";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return "il y a " + interval + " mois";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return "il y a " + interval + " jours";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return "il y a " + interval + " heures";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return "il y a " + interval + " minutes";
    }
    return "il y a " + Math.floor(seconds) + " secondes";
};

export const VideoVuesAndDate = ({ video, small = false }) => {
    const [date, setDate] = React.useState(dateTimeToHowLongAgo(video.date));
    return (
        <Description
            sx={
                !small
                    ? {
                          marginBottom: "4px",
                          marginTop: "4px",
                          cursor: "pointer",
                      }
                    : {
                          cursor: "pointer",
                      }
            }
        >
            {video.views} vues • {date}
        </Description>
    );
};
