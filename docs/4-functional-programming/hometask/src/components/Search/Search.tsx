import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';

interface SearchProps {
  updateSearch?: (val) => void;
}

export function Search({ updateSearch }: SearchProps) {
  const [searchedValue, setSearchedValue] = useState<string>('');

  const onChange = (value) => {
    setSearchedValue(value);
  }

  useEffect(() => {
    updateSearch(searchedValue)
  }, [searchedValue])

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      onChange={(e) => onChange(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}
