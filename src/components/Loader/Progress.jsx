import PropTypes from 'prop-types';
import styles from "./Progress.module.css";

const Loader = ({ message = 'Loading...' }) => (
  <div className={styles['loader-container']}>
    <div className={styles["dots-container"]}>
      <div className={styles["dot"]}></div>
      <div className={styles["dot"]}></div>
      <div className={styles["dot"]}></div>
    </div>
    <p className={styles["message"]}>{message}</p>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string,
};

export default Loader;