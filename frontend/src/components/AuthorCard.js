import { Avatar, Button, Container, Divider, Stack } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import React from "react";
import { styled } from "@mui/material/styles";

export const LowerButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontWeight: "bold",
}));

const SubButton = styled(LowerButton)(({ theme }) => ({
    backgroundColor: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: theme.palette.text.secondary,
    },
}));

export const AvatarLink = styled(Link)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
}));

export const Description = styled("p")(({ theme }) => ({
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    maxHeight: "3.6rem",
    overflow: "hidden",
    margin: 0,
}));

export const ChannelName = styled("p")(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: "bold",
    margin: 0,
    color: theme.palette.text.primary,
}));

export const CleanLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
}));

export const AuthorCard = ({ author }) => (
    <Grid container spacing={2} sx={{ paddingTop: 2, paddingBottom: 2.5 }}>
        <Grid xs={4} display="flex" justifyContent="center" alignItems="center">
            <AvatarLink
                href={`/channel/@${author.identifier}`}
                underline="none"
            >
                <Avatar
                    alt={author.name}
                    src={author.avatar}
                    sx={{ width: 136, height: 136 }}
                />
            </AvatarLink>
        </Grid>
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            xs={6.5}
        >
            <CleanLink href={`/channel/@${author.identifier}`} underline="none">
                <Stack>
                    <ChannelName sx={{ marginBottom: 1 }}>
                        {author.name}
                    </ChannelName>
                    <Description sx={{ marginBottom: "4px" }}>
                        @{author.identifier} • {author.subCount} abonnés
                    </Description>
                    <Description>{author.description}</Description>
                </Stack>
            </CleanLink>
        </Grid>
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            xs={1.5}
        >
            <SubButton variant="contained">S'abonner</SubButton>
        </Grid>
    </Grid>
);
