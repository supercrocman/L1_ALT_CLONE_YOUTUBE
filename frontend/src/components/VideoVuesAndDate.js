import { Description } from '@/components/AuthorCard';
import React from 'react';
import { Skeleton } from '@mui/material';

export const dateTimeToHowLongAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return 'il y a ' + interval + ' ans';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return 'il y a ' + interval + ' mois';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return 'il y a ' + interval + ' jours';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return 'il y a ' + interval + ' heures';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return 'il y a ' + interval + ' minutes';
    }
    if (interval <= 0) {
        return "a l'instant";
    }
    return 'il y a ' + Math.floor(seconds) + ' secondes';
};

export const VideoVuesAndDate = ({ video, small = false }) => {
    const [date, setDate] = React.useState('');
    React.useEffect(() => {
        if (video) {
            setDate(dateTimeToHowLongAgo(video.uploaded_at));
        }
    }, [video]);
    if (!video) {
        return <Skeleton variant="text" width={'100%'} />;
    }
    return (
        <Description
            sx={{
                marginBottom: !small && '4px',
                marginTop: !small && '4px',
                cursor: 'pointer',
            }}
        >
            {video.views} vues • {date}
        </Description>
    );
};
