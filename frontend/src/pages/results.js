import { AuthorCard, LowerButton } from '@/components/AuthorCard';
import { Container, Divider, Typography } from '@mui/material';

import Image from 'next/image';
import React from 'react';
import SearchBar from '@/components/SearchBar';
import TuneIcon from '@mui/icons-material/Tune';
import { VideoCard } from '@/components/VideoCard';
import results from '../../public/results.svg';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import axiosInstance from '@/utils/axiosInterceptor';

const LastAuthorVideo = styled('p')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    marginTop: '24px',
    marginBottom: '16px',
}));

const Results = ({ search_query = '', data = [] }) => {
    console.log(data);
    const [featuredAuthor, setFeaturedAuthor] = React.useState(
        data?.topChannelVideos_found?.length > 0
            ? typeof data.topChannelVideos_found[0].author === 'string'
                ? data.authors_found.find(
                      (author) =>
                          author.identifier ===
                          data.topChannelVideos_found[0].author
                  )
                : data.topChannelVideos_found[0].author
            : null
    );
    return (
        <>
            <Container>
                <LowerButton variant="action" startIcon={<TuneIcon />}>
                    Filtres
                </LowerButton>
                <Divider />
                {featuredAuthor && (
                    <>
                        <AuthorCard author={featuredAuthor} />
                        <Divider />
                        <LastAuthorVideo>
                            Dernières vidéos de {featuredAuthor.name}
                        </LastAuthorVideo>
                        {data.topChannelVideos_found.map((authorVideo, i) => {
                            authorVideo.author = featuredAuthor;
                            return (
                                <VideoCard
                                    key={'authorVideo' + i}
                                    video={authorVideo}
                                />
                            );
                        })}
                        <Divider sx={{ mt: '12px' }} />
                    </>
                )}
                {data?.videos_found?.map((video, i) => {
                    if (typeof video.author === 'string')
                        video.author = data.authors_found.find(
                            (author) => author.identifier === video.author
                        );
                    return <VideoCard key={'searchVideo' + i} video={video} />;
                })}
                {(data?.length === 0 ||
                    (data?.videos_found?.length === 0 &&
                        data?.topChannelVideos_found?.length === 0)) && (
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: '32px',
                        }}
                    >
                        <Image
                            src="/results.svg"
                            alt="Logo"
                            width={424}
                            height={239}
                        />
                        <Typography
                            variant="h4"
                            component="h4"
                            margin="16px 0px"
                        >
                            Aucun résultat trouvé
                        </Typography>
                        <Typography textAlign="center">
                            Essayez d'autres mots clés ou supprimez les filtres
                            de recherche
                        </Typography>
                    </Container>
                )}
            </Container>
        </>
    );
};

export async function getServerSideProps(context) {
    // get the search_query from the query parameters
    const { search_query } = context.query;

    let data = [];
    try {
        // fetch data from the API based on the search_query
        const response = await axiosInstance.post(`/api/submit-search`, {
            q: search_query,
        });
        console.log(response.data);
        data = response.data;
    } catch (error) {
        console.log(error.message);
    }
    // pass the data to the page component as props
    return {
        props: { search_query, data },
    };
}

export default Results;
