import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import getSortOrder from "../../utils/getSortOrder";
import styles from "./Search.module.scss"

let searchAndSortTimeoutId = "";

const SearchAndSort = ({ searchText, setSearchText, sort, setSort, setPage, setSearchParams, repoCount, resetSearch }) => {

  const searchAndSortChangeHandler = (searchValue, sortValue) => {
    setSearchText(searchValue);
    setSort(sortValue);
    setPage(1);

    if (searchAndSortTimeoutId)
      clearTimeout(searchAndSortTimeoutId);

    if (!searchValue) {
      resetSearch();
      // return
    }

    searchAndSortTimeoutId = setTimeout(() => {
      let newSearchParams = {
        q: searchValue,
        p: 1,
      }

      const order = getSortOrder(sortValue);
      if (order) {
        newSearchParams = { ...newSearchParams, s: (sortValue), o: order }
      }

      setSearchParams({ ...newSearchParams })
    }, 500)
  }

  return (
    <div className={styles.cont}>
      <TextField
        value={searchText}
        size="small"
        variant="outlined"
        onChange={(e) => searchAndSortChangeHandler(e.target.value, sort)}
        placeholder="Enter repo name or keywords"
        sx={{
          "& .MuiInputBase-input": { fontSize: "16px" },
        }}
        className={styles.search}
        autoComplete="off"
        id='password'
      />
      {repoCount ? (
        <FormControl size="small" className={styles.sortCont}>
          <InputLabel
            id="repo-sort"
            className={styles.sortLabel}
          >
            Sort
          </InputLabel>
          <Select
            labelId="repo-sort"
            label="sort"
            value={sort}
            onChange={(e) => searchAndSortChangeHandler(searchText, e.target.value)}
            variant="outlined"
            size="small"
            className={styles.sortSelect}
            MenuProps={{ disablePortal: true }}
          >
            <MenuItem value="best-match">Best Match</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="stars">Stars</MenuItem>
            <MenuItem value="created">Created</MenuItem>
            <MenuItem value="updated">Updated</MenuItem>
          </Select>
        </FormControl>
      ) : null}
    </div>

  )

}

export default SearchAndSort;