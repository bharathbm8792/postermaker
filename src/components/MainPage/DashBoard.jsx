import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";
import logo from '/public/logo.jpg'

function DashBoard() {
    const navigate = useNavigate();

    return (
        <div className={styles.overallContainer}>
            <p>Version  {import.meta.env.VITE_APP_VER} </p>
            <img src={logo} alt='Missing pets Bangalore' style={{ width: "100px", height: "100px", marginBottom: "20px" }} />

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