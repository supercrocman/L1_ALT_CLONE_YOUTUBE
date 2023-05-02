import AccountMenu from "@/components/AccountMenu";
import { Container } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import { VideoCard } from "@/components/VideoCard";
import styleHeader from "@/styles/header.module.css";

export default function Home() {
    return (
        <>
            <div className={styleHeader.HeaderContainer}>
                <SearchBar />
                <AccountMenu></AccountMenu>
            </div>
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
