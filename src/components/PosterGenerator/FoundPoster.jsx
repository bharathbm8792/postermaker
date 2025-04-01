import styles from './FoundPoster.module.css';

import image from '../../assets/dog.jpeg';
function FoundPoster(props) {
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
                }            </div>
            <div className={styles.singlePicContainer}>
                <div className={data.Reward === "Yes" ? styles.imageContainerReward : styles.imageContainer}>
                    <img src={data.croppedImage} alt={`${data.FoundpetType} Image`} />
                    {/* <img src={image} alt={`${data.petType} Image`} width={130} height={150} /> */}

                </div>
                <div className={styles.data1Container}>
                    {/* {data.Name && <span>NAME : {data.Name.toUpperCase()}</span>} */}
                    {data.ExpectedAge && <span className={styles.detailTextCollar}>Expected Age: {data.ExpectedAge.toUpperCase()}</span>}
                    {/* {data.ExpectedAge && <span className={styles.detailText}>Expected Age:</span>}
                    {data.ExpectedAge &&  <span className={styles.detailText}>{data.ExpectedAge.toUpperCase()}</span>} */}
                    {data.FoundGender && <span className={styles.detailText}>Gender: {data.FoundGender.toUpperCase()}</span>}
                    {data.FoundBreed && <span className={styles.detailText}>Breed: {data.FoundBreed.toUpperCase()}</span>}
                    {data.FoundCollar && <span className={styles.detailTextCollar}>Collar Colour: {data.FoundCollar.toUpperCase()}</span>}
                    <div className={styles.bottomLine}></div>
                </div>
            </div>
            <div className={`${styles.dataContainer} ${isFoundPlaceLong ? styles.lengthMoreContainer : ""}`}>
                {data.FoundPlace && (<span className={styles.detailText}>Found Place: {data.FoundPlace} on {formatDate(data.FoundDate)}{data.FoundTime ? ` at ${formatTime(data.FoundTime)}` : ""}</span>)}
                {data.FoundLandmark && <span className={styles.detailText}>Landmark: {data.FoundLandmark}</span>}
                {data.FoundIdentification && <span className={styles.detailText}>{data.FoundIdentification}</span>}
            </div>


            <div className={`${styles.contactContainer} ${isContactLong ? styles.contactMoreContainer : ""}`}>
                <span>Rescuer's Contact : {data.RescuerContact}</span>
            </div>
        </div >
    )
}

export default FoundPoster
