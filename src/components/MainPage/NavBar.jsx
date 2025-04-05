import { useState } from 'react';
import logo from '../../assets/LOGO.jpg';
import styles from './NavBar.module.css';
import { IoClose } from "react-icons/io5";



// function NavBar() {
//     return (
//         <div className={styles.overallContainer}>
//             <img src={logo} title='Missing Pets Bangalore Logo' alt='Missing Pets Bangalore Logo' className={styles.logo} />
//             <span className={styles.ledText}>Missing Pets Bengaluru</span>
//         </div>
//     )
// }



function NavBar() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className={styles.overallContainer}>
            <img
                src={logo}
                title='Click to view logo'
                alt='Missing Pets Bangalore Logo'
                className={styles.logo}
                onClick={() => { setShowModal(true) }}
            />
            <div className={styles.navBarTextcontainer}>
                <span className={styles.heading}>Missing Pets Bengaluru</span>
                <span className={styles.heading2}>- Poster Maker Tool</span>
            </div>

            {showModal && (
                <div className={styles.modal} onClick={() => { setShowModal(false) }}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={logo} alt="Logo Preview" className={styles.modalImage} />
                        <span title='Click to close preview' className={styles.closeButton} onClick={() => { setShowModal(false) }}><IoClose size={20} /></span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar