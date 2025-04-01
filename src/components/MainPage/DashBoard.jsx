import styles from './Dashboard.module.css';
import { useNavigate, Outlet } from "react-router-dom";

// import logo from '/public/logo.jpg'
// import logo from '../../assets/logo.jpg';
import logo from '../../assets/LOGO.jpg';
import NavBar from './NavBar';
import Footer from './Footer';



function DashBoard() {
    const navigate = useNavigate();
    const showButton = location.pathname === "/";

    return (
        <div className={styles.overallContainer}>
            <NavBar />

            {showButton && (
                <div className={styles.container}>
                    <button title='Click to create poster' className={styles.createPosterButton} onClick={() => navigate('/createposter')}>
                    </button>
                </div>
            )}
            {!showButton &&
                <div className={styles.container}>
                    <Outlet />
                </div>
            }
            <Footer />
        </div>
    )
}

export default DashBoard;