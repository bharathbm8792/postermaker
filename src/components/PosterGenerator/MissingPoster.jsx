import styles from './MissingPoster.module.css';

import image from '../../../public/dog.jpeg';
function MissingPoster(props) {
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

    const isLastSeenLong = data.Missingplace.length > 20;
    const isContactLong = data.Contact.length > 10;

    return (
        <div className={styles.container}>
            <div className={styles.headingContainer}>
                <span>MISSING {data.petType.toUpperCase()}</span>
            </div>
            <div className={styles.singlePicContainer}>
                <div className={styles.imageContainer}>
                    {/* <img src={data.croppedImage} alt={`${data.petType} Image`} width={130} height={150} /> */}
                    <img src={image} alt={`${data.petType} Image`} width={130} height={150} />

                </div>
                <div className={styles.data1Container}>
                    {/* {data.Name && <span>NAME : {data.Name.toUpperCase()}</span>} */}
                    {data.Name && <h2 className={styles.nameText}>{data.Name.toUpperCase()}</h2>}
                    {data.Age && <span className={styles.detailText}>AGE: {data.Age.toUpperCase()} {data.Neutered === "Yes" ? "( Neutered )" : ""}</span>}
                    {data.Gender && <span className={styles.detailText}>GENDER: {data.Gender.toUpperCase()}</span>}
                    {data.Breed && <span className={styles.detailText}>BREED: {data.Breed.toUpperCase()}</span>}
                    {data.Collarcolor && <span className={styles.detailTextCollar}>COLLAR COLOUR: {data.Collarcolor.toUpperCase()}</span>}
                    <div className={styles.bottomLine}></div>
                </div>
            </div>
            <div className={`${styles.dataContainer} ${isLastSeenLong ? styles.lengthMoreContainer : ""}`}>
                {data.Missingplace && (<span className={styles.detailText}>LAST SEEN: {data.Missingplace} on {formatDate(data.MissingDate)}{data.MissingTime ? ` at ${formatTime(data.MissingTime)}` : ""}</span>)}
                {data.Landmark && <span className={styles.detailText}>LANDMARK: {data.Landmark}</span>}
                {data.identification && <span className={styles.detailText}>IDENTIFICATION: {data.identification}</span>}
            </div>
            {data.RewardType !== "" &&  
                <div className={`${styles.rewardContainer} ${data.RewardType === "Substantial" ? styles.rewardContainerSub : ""}`}>
                    {data.RewardType === "Substantial" && <span>Substantial reward will be given</span>}
                    {data.RewardType === "Amount" && <span>REWARD: &#8377; {data.RewardAmount} /-</span>}
                </div>
            }

            <div className={`${styles.contactContainer} ${isContactLong ? styles.contactMoreContainer : ""}`}>
                <span>CONTACT : {data.Contact}</span>
            </div>
        </div >
    )
}

export default MissingPoster
