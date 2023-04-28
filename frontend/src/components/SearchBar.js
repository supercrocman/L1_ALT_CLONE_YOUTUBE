import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import styleSearch from "../styles/SearchBar.module.css";
import { styled } from "@mui/material/styles";

const SearchForm = styled("form")(({ theme }) => ({
    height: "40px",
    marginTop: 10,
}));

export default function SearchBar() {
    const [inputValue, setInputValue] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const filterOptions = (options, { inputValue }) => {
        if (inputValue.length > 2) {
            return options;
        }
        return [];
    };

    return (
        <SearchForm
            action="/results"
            className={styleSearch.SearchBoxContainer}
        >
            <Autocomplete
                disablePortal
                freeSolo
                id="SearchBar-AutoComplete"
                sx={{
                    width: 400,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "30px 0 0 30px",
                        color: "white",
                        backgroundColor: "hsl(0, 0%, 7%)",
                        padding: "1px",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                            border: "1px solid hsl(0, 0%, 18.82%)",
                            borderRight: "none",
                        },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            border: "1px solid hsl(0, 0%, 18.82%)",
                            borderRight: "none",
                        },
                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                            border: "1px solid hsl(0, 0%, 18.82%)",
                            borderRight: "none",
                        },
                    "& .MuiAutocomplete-endAdornment .MuiIconButton-root": {
                        color: "white",
                    },
                    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                        paddingLeft: "15px",
                    },
                }}
                options={searchResults}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    if (newInputValue.trim().length > 2) {
                        axios
                            .post("http://localhost:3001/api/search", {
                                q: newInputValue,
                            })
                            .then(function (response) {
                                setSearchResults(response.data.videos);
                                if (response.data.topChannelName) {
                                    setSearchResults([
                                        response.data.topChannelName,
                                        ...response.data.videos,
                                    ]);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    setInputValue(newInputValue);
                }}
                filterOptions={filterOptions}
                renderInput={(params) => (
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        {...params}
                        placeholder="Recherche"
                        name="search_query"
                    />
                )}
            />
            <Button
                variant="contained"
                className={styleSearch.buttonSearch}
                type="submit"
                sx={{
                    borderRadius: "0px 30px 30px 0px",
                    background: "hsla(0, 0%, 100%, 0.08)",
                    border: "1px solid hsl(0, 0%, 18.82%)",
                    boxShadow: 0,
                    "&:hover": {
                        background: "hsla(0, 0%, 100%, 0.08)",
                    },
                }}
            >
                <div className={styleSearch.SearchIconBox}>
                    <SearchIcon
                        className={styleSearch.SearchIcon}
                        fontSize="large"
                    />
                </div>
            </Button>
        </SearchForm>
    );
}
