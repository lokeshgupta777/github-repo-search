import { Button } from "@mui/material";
import { PAGE_SIZE } from "../../utils/constants";
import { useMemo } from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./Pagination.module.scss"

const Pagination = ({ page, setPage, repoCount, searchParams, setSearchParams }) => {

  const noPages = useMemo(() => {
    return Math.ceil(repoCount / PAGE_SIZE);
  }, [repoCount])

  const middleButtonsToMap = () => {
    const len = Math.min(noPages - 2, 3);
    if (len <= 0)
      return []
    let start = Math.max(page - 1, 2);
    start = Math.min(start, noPages - len);
    return Array.from(Array(len), (ele, idx) => idx + start)
  }

  const pageChangeHandler = (newPage) => {
    const query = searchParams.get('q') ?? "";
    const sort = searchParams.get('s') ?? "";
    const order = searchParams.get('o') ?? "";

    setPage(newPage)
    setSearchParams({
      q: query,
      s: sort,
      o: order,
      p: newPage
    })
  }

  return (
    <div className={styles.cont}>
      <Button variant="outlined" disabled={page === 1} onClick={() => pageChangeHandler(page - 1)}><NavigateBeforeIcon /></Button>
      <Button variant={page === 1 ? "contained" : "text"} onClick={() => pageChangeHandler(1)}>1</Button>
      {((page - 1) > 2) ? <span>...</span> : null}
      {middleButtonsToMap().map((ele, index) => (
        <Button key={ele} variant={page === ele ? "contained" : "text"} onClick={() => pageChangeHandler(ele)}>{ele}</Button>
      ))}
      {((noPages - page) > 2) ? <span>...</span> : null}
      {(noPages > 1) ? <Button variant={page === noPages ? "contained" : "text"} onClick={() => pageChangeHandler(noPages)}>{noPages}</Button> : null}
      <Button variant="outlined" disabled={page === noPages} onClick={() => pageChangeHandler(page + 1)}><NavigateNextIcon /></Button>
    </div>
  )
}

export default Pagination;