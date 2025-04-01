import PropTypes from 'prop-types';
import styles from "./Progress.module.css";
import { FaPaw } from "react-icons/fa"; // Importing paw icon from react-icons
import { IoPawOutline } from "react-icons/io5";

const Loader = ({ message = 'Loading...' }) => (
  <div className={styles['loader-container']}>
    <div className={styles["paws-container"]}>
      <FaPaw className={styles["paw"]} />
      {/* <FaPaw className={styles["paw"]} /> */}
      {/* <FaPaw className={styles["paw"]} /> */}
      <IoPawOutline className={styles["paw"]}/>
      <FaPaw className={styles["paw"]} />
      <IoPawOutline className={styles["paw"]}/>


    </div>
    <p className={styles["message"]}>{message}</p>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string,
};

export default Loader;