import { Container } from "@mui/material";
import { VideoCard } from "@/components/VideoCard";

export default function Home() {
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
                {[...Array(10)].map((_, index) => (
                    <VideoCard
                        key={index}
                        video={{
                            title: "Test video title " + index,
                            description: "Test",
                            views: 120,
                            length: 120,
                            thumbnail:
                                "https://i.ytimg.com/vi/Q5tngJoo328/maxresdefault.jpg",
                            identifier: "Test",
                            uploaded_at: "2023-04-25 11:33:12",
                            author: {
                                identifier: "Test",
                                name: "Test",
                                avatar: "Test",
                                subCount: 0,
                            },
                        }}
                        vertical
                    />
                ))}
            </Container>
        </>
    );
}
