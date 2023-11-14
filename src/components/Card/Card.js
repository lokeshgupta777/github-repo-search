import styles from "./Card.module.scss"
import StarIcon from '@mui/icons-material/Star';
import getFormattedDate from "../../utils/getFormattedDate";

const Card = ({ data }) => {

  

  return (
    <div className={styles.repo}>
      <img src={data?.avatar} className={styles.repo__img} />
      <div className={styles.repo__nameAndDesc}>
        <a href={data?.url}>{data?.fullName}</a>
        <p>{data?.desc}</p>
        <div>
          <span>{data?.lang}</span>
          {/* <span>Created: {getFormattedDate(new Date(data?.created))}</span> */}
          <span>Updated: {getFormattedDate(new Date(data?.pushed || data?.updated))}</span>
        </div>
      </div>
      <div>
        <span className={styles.repo__stars}>
          <StarIcon htmlColor="yellow" /> {data?.stars}
        </span>

      </div>
    </div>
  )
}

export default Card;