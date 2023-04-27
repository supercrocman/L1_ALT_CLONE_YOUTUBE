import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { styled } from "@mui/material/styles";

const ChannelCard = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 0px",
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    paddingTop: "8px",
    paddingBottom: "8px",
}));

const ChannelNameVideo = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.text.primary,
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}));

export const AuthorName = ({ author, small = false }) => {
    return (
        <ChannelCard sx={small && { pt: "4px", pb: 0 }}>
            <ChannelNameVideo href={`/channel/@${author.identifier}`}>
                {!small && (
                    <Avatar
                        alt={author.name}
                        src={author.avatar}
                        sx={{
                            width: 24,
                            height: 24,
                            marginRight: "8px",
                        }}
                    />
                )}
                {author.name}
            </ChannelNameVideo>
        </ChannelCard>
    );
};
