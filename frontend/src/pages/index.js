import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { VideoCard } from "@/components/VideoCard";
import Divider from '@mui/material/Divider';



export default function Home() {
  let user_reco = false // j'utilise ça pour l'instant, a voir avec la team profil
  const user = 3 // a relier avec le compte connecté
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/timeline",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user": user,
        }),

      }
    )
      .then((response) => response.json())
      .then((data) => setVideos(data))
  }, []);
  if(videos.user_reco){
    user_reco = true;
  }
  const vids = videos.videos;
  const auths = videos.authors;
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    "& > *": {
                        mt: 4,
                    },
                }}
            >
                {Array.isArray(vids) && vids.map((video, index) => 
                {
                  const author = auths.find((author) => author.identifier === video.author);
                return(
                    <VideoCard
                        key={index}
                        video={{
                          title: video.title,
                          description: video.description,
                          views: video.views,
                          length: video.length,
                          thumbnail: video.thumbnail,
                          identifier: video.identifier,
                          uploaded_at: video.uploaded_at,
                          author: {
                            identifier: author.identifier,
                            name: author.name,
                            avatar: author.avatar,
                            subCount: author.subCount,
                          },
                        }}
                        vertical
                    />
                )})}
            </Container>
        </>
    );
}