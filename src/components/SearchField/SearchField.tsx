import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './SearchField.module.scss';

interface Props {
  searchQuery: string;
  handleOnChange: (event: any) => void;
}

export const SearchBar: React.FC<Props> = ({ searchQuery, handleOnChange }) => {
  return (
    <div className={styles.search}>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleOnChange}
      />
    </div>
  );
};
