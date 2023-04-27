import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CardActions from '@mui/material/CardActions';
import Router from 'next/router';

const VideoCard = ({ thumbnail, title, views, date, duration, identifier, description }) => {
  return (
    <Card sx={{ maxWidth: 345, marginRight: 8}} onClick={() => Router.push('/video/' + identifier)}>
      <CardMedia
        component="img"
        height="140"
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {views} vues
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Durée : {Math.floor(duration / 60)}:{duration % 60}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
