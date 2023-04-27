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
          width: 800,
          "& .MuiOutlinedInput-root": {
            borderRadius: "0",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #95A1AC"
          }
        }}
        options={searchResults}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          if (newInputValue.trim().length > 2) {
            axios.post('http://localhost:3001/api/search', {
              q: newInputValue
            })
              .then(function (response) {
                console.log(response.data.topChannelName, response.data.videos);
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
        renderInput={(params) => <TextField id="outlined-basic" variant="outlined" {...params} label="Search ..." />
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            alert('Enter pressed, Search for : ' + inputValue);
          }
        }}
      />
      <Button variant="contained"
        className={styleSearch.buttonSearch}
        onClick={() => {
          alert('Clicked, Search for : ' + inputValue);
        }}
        sx={{
          borderTopRightRadius: 4, borderBottomRightRadius: 4,
          borderTopLeftRadius: 0, borderBottomLeftRadius: 0, background: '#95A1AC', boxShadow: 0,
        }}>
        <div className={styleSearch.SearchIconBox}>
          <SearchIcon className={styleSearch.SearchIcon} fontSize='large' />
        </div>
      </Button>
    </div>
  );
}