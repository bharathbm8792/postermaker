import styles from './Footer.module.css';
import { BiLogoInstagram } from "react-icons/bi";


function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.instagramLink}>
                <a
                    href="https://www.instagram.com/missing_pets_bangalore?igsh=OW9nYmh5amg1MGZk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    title='Click to open Instagram page'
                >
                    <BiLogoInstagram size={23} />
                </a>
            </div>
            <div className={styles.versionContainer}>
                <div className={styles.version}>
                    v {import.meta.env.VITE_APP_VER}
                    <span className={styles.tooltip}>Version {import.meta.env.VITE_APP_VER}</span> {/* Tooltip */}
                </div>
            </div>

        </div>
    );
}

export default Footer;
