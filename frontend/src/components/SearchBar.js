import * as React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import axiosInstance from '@/utils/axiosInterceptor';

const SearchForm = styled('form')(({ theme }) => ({
    height: '40px',
    color: 'black',
    display: 'flex',
    marginTop: '7px',
}));

const SearchIconThemed = styled(SearchIcon)(({ theme }) => ({
    color: '#f1f1f1 !important',
    width: '1.75rem',
    height: '1.75rem',
}));

const SearchBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '4px',
}));

export default function SearchBar({ defaultValue = '' }) {
    const [inputValue, setInputValue] = React.useState(null);
    const [searchResults, setSearchResults] = React.useState([]);
    const [cancelToken, setCancelToken] = React.useState(null);
    const formRef = React.useRef(null);
    if (defaultValue && inputValue === null) {
        setInputValue(defaultValue);
    }

    const filterOptions = (options, { inputValue }) => {
        if (inputValue.length > 2) {
            return options;
        }
        return [];
    };

    return (
        <SearchForm action="/results" ref={formRef}>
            <Autocomplete
                disablePortal
                freeSolo
                id="SearchBar-AutoComplete"
                sx={{
                    width: 550,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '30px 0 0 30px',
                        color: 'white',
                        backgroundColor: 'hsl(0, 0%, 7%)',
                        padding: '1px',
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                        {
                            border: '1px solid hsl(0, 0%, 18.82%)',
                            borderRight: 'none',
                        },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            border: '1px solid hsl(0, 0%, 18.82%)',
                            borderRight: 'none',
                        },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                            border: '1px solid hsl(0, 0%, 18.82%)',
                            borderRight: 'none',
                        },
                    '& .MuiAutocomplete-endAdornment .MuiIconButton-root': {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
                        paddingLeft: '15px',
                    },
                }}
                options={searchResults}
                inputValue={inputValue || ''}
                onChange={async (event, value) => {
                    if (value) {
                        if (cancelToken) {
                            await cancelToken.cancel();
                        }
                        await formRef.current.submit();
                    }
                }}
                onInputChange={async (event, newInputValue) => {
                    setInputValue(newInputValue);
                    if (newInputValue.trim().length > 2) {
                        if (cancelToken) {
                            cancelToken.cancel();
                        }
                        const newCancelToken =
                            axiosInstance.CancelToken.source();
                        setCancelToken(newCancelToken);
                        axiosInstance
                            .post(
                                'http://localhost:3001/api/search',
                                {
                                    q: newInputValue,
                                },
                                { cancelToken: newCancelToken.token }
                            )
                            .then((response) => {
                                if (response.data.topChannelName) {
                                    setSearchResults([
                                        response.data.topChannelName,
                                        ...response.data.videos,
                                    ]);
                                    return;
                                }
                                setSearchResults(response.data.videos);
                            })
                            .catch((error) => {
                                if (!axiosInstance.isCancel(error)) {
                                    console.log(error);
                                }
                            });
                    }
                }}
                filterOptions={filterOptions}
                renderInput={(params) => (
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        {...params}
                        placeholder="Rechercher"
                        name="search_query"
                    />
                )}
            />
            <Button
                variant="contained"
                type="submit"
                sx={{
                    borderRadius: '0px 30px 30px 0px',
                    background: 'hsla(0, 0%, 100%, 0.08)',
                    border: '1px solid hsl(0, 0%, 18.82%)',
                    boxShadow: 0,
                    '&:hover': {
                        background: 'hsla(0, 0%, 100%, 0.08)',
                    },
                }}
            >
                <SearchBox>
                    <SearchIconThemed fontSize="large" />
                </SearchBox>
            </Button>
        </SearchForm>
    );
}
