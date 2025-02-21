import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";

function DashBoard() {
    const navigate = useNavigate();

    return (
        <div className={styles.overallContainer}>
            <div className={styles.container}>
                <button onClick={() => navigate('/createposter')}>
                    Create Poster
                </button>
                {/* <button>
                    Get Suggestions
                </button> */}
            </div>
        </div>
    )
}

export default DashBoard;