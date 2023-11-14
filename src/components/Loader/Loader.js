import { CircularProgress } from "@mui/material"
import styles from "./Loader.module.scss"

const Loader = () => {
  return (
    <CircularProgress className={styles.loader}/>
  )
}

export default Loader;