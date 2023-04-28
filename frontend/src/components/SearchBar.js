import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import styleSearch from '../styles/SearchBar.module.css';
import axios from 'axios';

export default function SearchBar() {
  const [inputValue, setInputValue] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const filterOptions = (options, { inputValue }) => {
    if (inputValue.length > 2) {
      return options;
    }
    return [];
  };

  return (
    <div className={styleSearch.SearchBoxContainer}>
      <Autocomplete
        disablePortal
        freeSolo
        id="SearchBar-AutoComplete"
        sx={{
          width: 400,
          // border: "1px solid blue",
          "& .MuiOutlinedInput-root": {
            // border: "1px solid #95A1AC",
            borderRadius: "30px 0 0 30px",
            color: "white",
            backgroundColor: "#333",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #95A1AC",
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
            axios.post('http://localhost:3001/api/search', {
              q: newInputValue
            })
              .then(function (response) {
                setSearchResults(response.data.videos);
                if (response.data.topChannelName) { 
                  setSearchResults([response.data.topChannelName, ...response.data.videos]);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          setInputValue(newInputValue);
        }}
        filterOptions={filterOptions}
        renderInput={(params) => <TextField id="outlined-basic"
          variant="outlined"
          {...params}
          placeholder="Recherche"
        />
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            alert('Enter pressed, Search for : ' + inputValue);
          }
        }}
      />
      < Button variant="contained"
        className={styleSearch.buttonSearch}
        onClick={() => {
          alert('clicked');
        }}
        sx={{
          borderRadius: "0px 30px 30px 0px",
          background: '#cccccc',
          boxShadow: 0,
          "&:hover": {
            background: '#404040',
            color: '#fff',
          }
        }}>
        <div className={styleSearch.SearchIconBox}>
          <SearchIcon className={styleSearch.SearchIcon} fontSize='large' />
        </div>
      </Button>
    </div >
  );
}