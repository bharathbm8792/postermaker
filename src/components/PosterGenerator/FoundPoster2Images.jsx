import styles from './FoundPoster2Images.module.css';

import image from '../../assets/dog.jpeg';
function FoundPoster2Images(props) {
    const data = props.data;
    // console.log("DATA", data)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    const isFoundPlaceLong = data.FoundPlace.length > 20;
    const isContactLong = data.RescuerContact.length > 10;

    return (
        <div className={styles.container}>
            <div className={styles.headingContainer}>
                {data.FoundHeading.length === 0 ? <span>LOST {data.FoundpetType.toUpperCase()} FOUND</span> :
                    <span className={data.FoundHeading.length > 16 ? styles.longHeading : ''}>{data.FoundHeading.toUpperCase()}</span>
                }
            </div>
            <div className={styles.singlePicContainer}>
                <div className={data.Reward === "Yes" ? styles.imageContainerReward : styles.imageContainer}>
                    <img src={props.image1} alt={`${data.FoundpetType} Image`} />
                    <img src={props.image2} alt={`${data.FoundpetType} Image`} />
                </div>

            </div>
            <div className={styles.dataContainer}>
                <div className={styles.data1Container}>
                    {data.ExpectedAge && <span className={styles.detailTextCollar}>Expected Age: {data.ExpectedAge.toUpperCase()} {data.Neutered === "Yes" ? "( Neutered )" : ""}</span>}
                    {data.FoundGender && <span className={styles.detailText}>Gender: {data.FoundGender.toUpperCase()}</span>}
                    {data.FoundBreed && <span className={styles.detailText}>Breed: {data.FoundBreed.toUpperCase()}</span>}
                    {data.FoundCollar && <span className={styles.detailTextCollar}>Collar Colour: {data.FoundCollar.toUpperCase()}</span>}
                    {/* <div className={styles.bottomLine}></div> */}
                </div>
                <div className={`${styles.data1Container} ${isFoundPlaceLong ? styles.lengthMoreContainer : ""}`}>
                    {data.FoundPlace && (<span className={styles.detailText}>Found Place: {data.FoundPlace} on {formatDate(data.FoundDate)}{data.FoundTime ? ` at ${formatTime(data.FoundTime)}` : ""}</span>)}
                    {data.FoundLandmark && <span className={styles.detailText}>Landmark: {data.FoundLandmark}</span>}
                    {data.FoundIdentification && <span className={styles.detailText}>{data.FoundIdentification}</span>}
                    {((data.FoundIdentification?.length ?? 0) === 0 && (data.FoundLandmark?.length ?? 0) < 10) && <br />}

                </div>

            </div>

            <div className={`${styles.contactContainer} ${isContactLong ? styles.contactMoreContainer : ""}`}>
                <span>Rescuer's Contact : {data.RescuerContact}</span>
            </div>
        </div >
    )
}

export default FoundPoster2Images;
