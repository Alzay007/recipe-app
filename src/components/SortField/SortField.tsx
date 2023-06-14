import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core';
import { SortType } from '../../types/SortType';

import styles from './SortField.module.scss';

const useStyles = makeStyles((theme) => ({
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    paddding: '15'
  }
}));

interface Props {
  sortBy: SortType;
  handleStatus: (value: SortType) => void;
}

export const SortField: React.FC<Props> = ({ sortBy, handleStatus }) => {
  const classes = useStyles();

  return (
    <div className={styles.field}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Sort By</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={sortBy}
          label="sort"
          onChange={(event) => handleStatus(event.target.value as SortType)}
          MenuProps={{
            classes: { list: classes.menuList }
          }}
          sx={{ px: 3 }}
        >
          <MenuItem value={SortType.DEFAULT}>
            <em>Default</em>
          </MenuItem>
          <MenuItem value={SortType.RATING}>Rating</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
