import { AuthorCard, LowerButton } from "@/components/AuthorCard";
import { Container, Divider } from "@mui/material";

import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { VideoCard } from "@/components/VideoCard";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const author = {
    name: "John Doe",
    avatar: "/images/avatar.jpg",
    subCount: 1000,
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    identifier: "johndoe",
    lastVideos: [
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail:
                "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
            views: 1000,
            duration: 232323,
            date: "2023-02-10",
            identifier: "fivzrehihuy",
            author: {
                name: "John Doe",
                avatar: "/images/avatar.jpg",
                subCount: 1000,
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                identifier: "johndoe",
            },
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            thumbnail:
                "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
            views: 1000,
            duration: 232323,
            date: "2023-02-10",
            identifier: "fivzrehihuy",
            author: {
                name: "John Doe",
                avatar: "/images/avatar.jpg",
                subCount: 1000,
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                identifier: "johndoe",
            },
        },
    ],
};

const video = {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail:
        "https://i.ytimg.com/vi/FIVzREhIhUY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUeOp3smg7sq5WJDXwlf_LA2MtQQ",
    views: 1000,
    duration: 232323,
    date: "2023-02-10",
    identifier: "fivzrehihuy",
    author,
};

const LastAuthorVideo = styled("p")(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: "bold",
    margin: 0,
    padding: 0,
    marginTop: "24px",
    marginBottom: "16px",
}));

const Results = () => {
    const router = useRouter();
    const { search_query } = router.query;
    return (
        <>
            <Container>
                <LowerButton variant="action" startIcon={<TuneIcon />}>
                    Filtres
                </LowerButton>
                <Divider />
                {author && (
                    <>
                        <AuthorCard author={author} />
                        <Divider />
                    </>
                )}
                {author &&
                    author.lastVideos &&
                    author.lastVideos.length > 0 && (
                        <>
                            <LastAuthorVideo>
                                Dernières vidéos de {author.name}
                            </LastAuthorVideo>
                            {author.lastVideos.map((authorVideo, i) => (
                                <VideoCard
                                    key={"authorVideo" + i}
                                    video={authorVideo}
                                />
                            ))}
                            <Divider />
                        </>
                    )}
                {Array.from(new Array(100)).map((_, i) => (
                    <VideoCard key={"searchVideo" + i} video={video} />
                ))}
            </Container>
        </>
    );
};

export default Results;
