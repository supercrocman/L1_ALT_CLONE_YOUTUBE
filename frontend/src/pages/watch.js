import { NextVideos } from "@/components/NextVideos";

const relatedVideos = [
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
];

const Watch = () => {
    return (
        <div>
            <NextVideos videos={relatedVideos} />
        </div>
    );
};

export default Watch;
