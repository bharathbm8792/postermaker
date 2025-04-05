import styles from './PosterInputs.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import { useState } from 'react';
import { IoCopyOutline } from "react-icons/io5";

const PosterInputs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState({
        missingClicked: false,
        foundClicked: false,
        petType: "",
        Name: "",
        Age: "",
        Gender: "",
        Breed: "",
        Collarcolor: "",
        Missingplace: "",
        MissingDate: "",
        MissingTime: "",
        Landmark: "",
        identification: "",
        Contact: "",
        RewardAmount: "",
        Neutered: "No",
        Reward: "No",
        RewardType: "",
        Heading: "",
        FoundpetType: "",
        ExpectedAge: "",
        FoundGender: "",
        FoundBreed: "",
        FoundCollar: "",
        FoundPlace: "",
        FoundDate: "",
        FoundTime: "",
        FoundLandmark: "",
        FoundIdentification: "",
        RescuerContact: "",
        FoundHeading: "",
        textAreaInput: "",
        ...location.state
    });

    const [error, setError] = useState({
        petTypeErr: "",
        NameErr: "",
        AgeErr: "",
        GenderErr: "",
        BreedErr: "",
        CollarcolorErr: "",
        MissingplaceErr: "",
        MissingDateErr: "",
        MissingTimeErr: "",
        LandmarkErr: "",
        identificationErr: "",
        ContactErr: "",
        NeuteredErr: "",
        RewardErr: "",
        RewardTypeErr: "",
        ExpectedAgeErr: "",
        FoundGenderErr: "",
        FoundBreedErr: "",
        FoundCollarErr: "",
        FoundPlaceErr: "",
        FoundDateErr: "",
        FoundTimeErr: "",
        FoundLandmarkErr: "",
        FoundIdentificationErr: "",
        RescuerContactErr: "",
        FoundpetTypeErr: "",
    });

    // const [textAreaInput, setTextAreaInput] = useState("");
    const [copied, setCopied] = useState(false);


    const PetOptions = [
        { value: "Dog", label: "Dog" },
        { value: "Cat", label: "Cat" },
        { value: "Bird", label: "Bird" },
        { value: "Rabbit", label: "Rabbit" },
    ];

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption) => {
        setState((prevState) => ({
            ...prevState,
            petType: selectedOption ? selectedOption.value : "",
        }));
    };
    const handleSelectChangeFound = (selectedOption) => {
        setState((prevState) => ({
            ...prevState,
            FoundpetType: selectedOption ? selectedOption.value : "",
        }));
    };

    const FoundValidate = () => {
        let errors = {};
        let isValid = true;
        if (!state.FoundpetType) {
            errors.FoundpetTypeErr = "Pet Type is required";
            isValid = false;
        }

        // if (!state.ExpectedAge.trim()) {
        //     errors.ExpectedAgeErr = "Expected Age is required";
        //     isValid = false;
        // }
        // if (!state.FoundGender.trim()) {
        //     errors.FoundGenderErr = "Gender is required";
        //     isValid = false;
        // }
        // if (!state.FoundBreed.trim()) {
        //     errors.FoundBreedErr = "Breed is required";
        //     isValid = false;
        // }
        if (!state.FoundPlace.trim()) {
            errors.FoundPlaceErr = "Found Place is required";
            isValid = false;
        }
        if (!state.FoundDate.trim()) {
            errors.FoundDateErr = "Found Date is required";
            isValid = false;
        } else {
            const foundDate = new Date(state.FoundDate); // Convert input to Date object
            const today = new Date(); // Get today's date

            // Remove time part from both dates for an accurate date-only comparison
            today.setHours(0, 0, 0, 0);
            foundDate.setHours(0, 0, 0, 0);

            if (foundDate > today) {
                errors.FoundDateErr = "Found Date cannot be a future date";
                isValid = false;
            }
        }
        // if (!state.FoundTime.trim()) {
        //     errors.FoundTimeErr = "Found Time is required";
        //     isValid = false;
        // }
        // if (!state.FoundCollar.trim()) {
        //     errors.FoundCollarErr = "Collar colour is required";
        //     isValid = false;
        // }
        // if (!state.FoundLandmark.trim()) {
        //     errors.FoundLandmarkErr = "Landmark is required";
        //     isValid = false;
        // }
        if (!state.RescuerContact.trim()) {
            errors.RescuerContactErr = "Rescuer's contact is required";
            isValid = false;
        }

        setError(errors);
        return isValid;
    }
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!state.petType) {
            errors.petTypeErr = "Pet Type is required";
            isValid = false;
        }
        if (!state.Name.trim()) {
            errors.NameErr = "Name is required";
            isValid = false;
        }
        // if (state.Age.length !== 0) {
        // if (!state.Age.trim()) {
        //     errors.AgeErr = "Age is required";
        //     isValid = false;
        // }
        // }
        // if (state.Gender.length !== 0) {
        //     if (!state.Gender.trim()) {
        //         errors.GenderErr = "Gender is required";
        //         isValid = false;
        //     }
        // }
        // if (state.Breed.length !== 0) {
        //     if (!state.Breed.trim()) {
        //         errors.BreedErr = "Breed is required";
        //         isValid = false;
        //     }
        // }
        // if (state.Collarcolor.length !== 0) {
        // if (!state.Collarcolor.trim()) {
        //     errors.CollarcolorErr = "Collar color is required";
        //     isValid = false;
        // }
        // }
        if (!state.Missingplace.trim()) {
            errors.MissingplaceErr = "Missing place is required";
            isValid = false;
        }
        if (!state.MissingDate.trim()) {
            errors.MissingDateErr = "Missing date is required";
            isValid = false;
        } else {
            const missingDate = new Date(state.MissingDate); // Convert input to Date object
            const today = new Date(); // Get today's date

            // Remove time part from both dates for an accurate date-only comparison
            today.setHours(0, 0, 0, 0);
            missingDate.setHours(0, 0, 0, 0);

            if (missingDate > today) {
                errors.MissingDateErr = "Missing Date cannot be a future date";
                isValid = false;
            }
        }
        // if (state.MissingTime.length !== 0) {
        //     if (!state.MissingTime.trim()) {
        //         errors.MissingTimeErr = "Missing time is required";
        //         isValid = false;
        //     }
        // }
        // if (!state.Landmark.trim()) {
        //     errors.LandmarkErr = "Landmark is required";
        //     isValid = false;
        // }
        // if (state.identification.length !== 0) {
        //     if (!state.identification.trim()) {
        //         errors.identificationErr = "Identification mark is required";
        //         isValid = false;
        //     }
        // }
        if (!state.Contact.trim()) {
            errors.ContactErr = "Contact is required";
            isValid = false;
        }


        setError(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // console.log("Form Submitted", state);
            navigate("/generateposter", { state: state });
        }
    };

    const handleFoundSubmit = (e) => {
        e.preventDefault();
        if (FoundValidate()) {
            // console.log("Form Submitted", state);
            navigate("/generateposter", { state: state });
        }
    }

    const handleBackClick = (e) => {
        e.preventDefault();
        if (state.missingClicked === false && state.foundClicked === false) {
            navigate('/');
        }
        else {
            setState({ ...state, missingClicked: false, foundClicked: false })
        }
    }

    const handleTextAreaChange = (e) => {
        setState(prevState => ({ ...prevState, textAreaInput: e.target.value }));
    };

    const handleAutofill = () => {

        const parsedData = parseTextData(state.textAreaInput);
        setState(prevState => ({ ...prevState, ...parsedData }));
    };

    const handleAutofillFound = () => {
        const parsedData = parseTextDataFound(state.textAreaInput);
        setState(prevState => ({ ...prevState, ...parsedData }));
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`; // Convert to yyyy-MM-dd
    };

    const formatTime = (timeString) => {
        if (!timeString) return "";

        // If it's already in HH:mm format, return as is
        if (timeString.match(/^\d{2}:\d{2}$/)) {
            return timeString;
        }

        // Convert 12-hour format (e.g., "10:30 AM") to 24-hour (HH:mm)
        const match = timeString.match(/(\d{1,2}):?(\d{2})?\s*([APap][Mm])/);
        if (!match) return timeString;

        let [_, hour, minutes = "00", period] = match;
        hour = parseInt(hour, 10);

        if (period.toUpperCase() === "PM" && hour !== 12) {
            hour += 12;
        } else if (period.toUpperCase() === "AM" && hour === 12) {
            hour = 0;
        }

        return `${String(hour).padStart(2, "0")}:${minutes.padStart(2, "0")}`; // Ensures HH:mm format
    };


    const parseTextDataFound = (text) => {
        const data = {};
        const regexMapping = {
            FoundpetType: /Lost\s+(\w+)\s+Found/i,
            FoundGender: /Gender:\s*(\w+)/i,
            FoundBreed: /Breed:\s*(.+)/i,
            ExpectedAge: /Expected\s*age:\s*([\d\-]+\s*\w*)/i,
            FoundCollar: /Collar\s*colour:\s*(.+)/i,
            FoundPlace: /Found\s*place:\s*(.+)/i,
            FoundDate: /Found\s*date:\s*(\d{2}\/\d{2}\/\d{4})/i,
            FoundTime: /Found\s*time:\s*(\d{1,2}:\d{2}|\d{1,2}\s*[APap][Mm])/i,
            FoundLandmark: /Landmark:\s*(.+)/i,
            FoundIdentification: /Identification:\s*(.+)/i,
            RescuerContact: /Rescuer's\s*contact\s*number:\s*(\d{10,20})/i,
        };

        Object.keys(regexMapping).forEach((key) => {
            const match = text.match(regexMapping[key]);
            if (match) {
                let value = match[1] || "Yes";

                // Convert date & time formats
                if (key === "FoundDate") value = formatDate(value);
                if (key === "FoundTime") value = formatTime(value);

                data[key] = value;
            }
        });

        return data;
    };

    const parseTextData = (text) => {
        const data = {};
        const regexMapping = {
            petType: /Missing\s+(\w+)/i,
            Name: /Name:\s*(.+)/i,
            Breed: /Breed:\s*(.+)/i,
            Age: /Age:\s*(\d+\s*\w*)/i,
            Gender: /Gender:\s*(\w+)/i,
            FurColor: /Fur Color:\s*(.+)/i,
            Neutered: /Neutered\s*or\s*not:\s*(Yes|No)/i,
            Collarcolor: /Collar\s*Colour:\s*(.+)/i,
            Missingplace: /Last\s*seen:\s*(.+)/i,
            MissingDate: /Missing\s*date:\s*(\d{2}\/\d{2}\/\d{4})/i,
            MissingTime: /Missing\s*time:\s*(\d{1,2}:\d{2}|\d{1,2}\s*[APap][Mm])/i,
            Landmark: /Landmark:\s*(.+)/i,
            identification: /Identification:\s*(.+)/i,
            Contact: /Contact:\s*(\d{10,20})/i,
            RewardAmount: /Reward:\s*(\d{4,5})/i,
        };

        Object.keys(regexMapping).forEach((key) => {
            const match = text.match(regexMapping[key]);
            if (match) {
                let value = match[1] || "Yes";

                // Convert date & time formats
                if (key === "MissingDate") value = formatDate(value);
                if (key === "MissingTime") value = formatTime(value);

                data[key] = value;
            }
        });

        return data;
    };



    const missingText = `
    Missing Dog / Cat
    Name:
    Age:
    Gender:
    Breed:
    Neutered or not: 
    Collar colour:
    Last seen: 
    Landmark:
    Missing date:
    Missing time:
    Identification:
    Contact: `;

    const foundText = `
    Lost Dog / Cat Found
    Expected age:
    Gender:
    Breed:
    Collar colour:
    Found place:
    Landmark:
    Found date:
    Found time:
    Identification:
    Rescuer's contact number: `;

    const handleCopy = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);

        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={styles.overallContainer}>
            <button className={styles.backButton} onClick={handleBackClick}>BACK</button>
            {/* <div className={styles.container}>
                {!state.foundClicked && <button className={styles.actionButton} onClick={() => setState({ ...state, missingClicked: true })}>Missing Pet Poster</button>}
                {!state.missingClicked && <button className={styles.actionButton} onClick={() => setState({ ...state, foundClicked: true })}>Lost Pet Found Poster</button>}
            </div> */}
            <div className={styles.buttonContainer}>
                {!state.foundClicked && (
                    <button
                        className={`${styles.button} ${styles.missingButton}`}
                        onClick={() => setState({ ...state, missingClicked: true })}
                    >
                        Missing Pet Poster
                    </button>
                )}
                {!state.missingClicked && (
                    <button
                        className={`${styles.button} ${styles.foundButton}`}
                        onClick={() => setState({ ...state, foundClicked: true })}
                    >
                        Lost Pet Found Poster
                    </button>
                )}
            </div>

            {(state.missingClicked === true) && (
                <div className={styles.inputsContainer}>
                    <div>
                        <div>
                            <textarea
                                value={state.textAreaInput}
                                onChange={handleTextAreaChange}
                                placeholder="Paste missing pet details here..."
                                className={styles.responsiveTextarea}
                            />
                        </div>
                        <div className={styles.autoFillBtnContainer}>
                            <button className={styles.autoFillButton} onClick={handleAutofill} title='Click to autofill the data'>Autofill</button>
                            <div className={styles.copyContainer}>
                                <button onClick={() => handleCopy(missingText)} title="Click to copy text" className={styles.copyIcon}>
                                    <IoCopyOutline size={18} />
                                </button>

                                {copied && (
                                    <span className={styles.copiedText}>
                                        Copied to Clipboard!
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>


                        {/* Select Pet Type */}
                        <label>Select Pet <b style={{ color: "red" }}>*</b>:</label>
                        <Select
                            options={PetOptions}
                            placeholder="-- SELECT PET TYPE --"
                            onChange={handleSelectChange}
                            isSearchable={true}
                            className={styles.select_option}
                            menuPosition="fixed"
                            value={PetOptions.find(option => option.value === state.petType) || null}
                        />
                        {error.petTypeErr && <p className={styles.error}>{error.petTypeErr}</p>}

                        <label>Heading :</label>
                        <input
                            type="text"
                            name="Heading"
                            placeholder="Enter Custom Heading"
                            value={state.Heading}
                            onChange={handleChange}
                            className={styles.inputField}
                        />

                        {/* Pet Name */}
                        <label>Name <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="text"
                            name="Name"
                            placeholder="Enter Pet Name"
                            value={state.Name}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.NameErr && <p className={styles.error}>{error.NameErr}</p>}

                        <label>Age :</label>
                        <input
                            type="text"
                            name="Age"
                            placeholder="Enter Pet Age"
                            value={state.Age}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.AgeErr && <p className={styles.error}>{error.AgeErr}</p>}

                        <label>Gender :</label>
                        <input
                            type="text"
                            name="Gender"
                            placeholder="Enter Gender"
                            value={state.Gender}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.GenderErr && <p className={styles.error}>{error.GenderErr}</p>}

                        <label>Breed :</label>
                        <input
                            type="text"
                            name="Breed"
                            placeholder="Enter Breed"
                            value={state.Breed}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.BreedErr && <p className={styles.error}>{error.BreedErr}</p>}

                        <label>Neutered or Not <b style={{ color: "red" }}>*</b>:</label>
                        <div className={styles.radioContainer}>
                            <label>
                                <input type="radio" name="Neutered" value="Yes" onChange={handleChange} checked={state.Neutered === "Yes"} />Yes
                            </label>
                            <label>
                                <input type="radio" name="Neutered" value="No" onChange={handleChange} checked={state.Neutered === "No"} />No
                            </label>
                        </div>
                        {error.NeuteredErr && <p className={styles.error}>{error.NeuteredErr}</p>}

                        <label>Collar Color :</label>
                        <input
                            type="text"
                            name="Collarcolor"
                            placeholder="Enter Collar Color"
                            value={state.Collarcolor}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.CollarcolorErr && <p className={styles.error}>{error.CollarcolorErr}</p>}

                        <label>Missing Place <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="text"
                            name="Missingplace"
                            placeholder="Enter Missing Place"
                            value={state.Missingplace}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.MissingplaceErr && <p className={styles.error}>{error.MissingplaceErr}</p>}

                        <label>Missing Date <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="date"
                            name="MissingDate"
                            value={state.MissingDate}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.MissingDateErr && <p className={styles.error}>{error.MissingDateErr}</p>}

                        <label>Missing Time :</label>
                        <input
                            type="time"
                            name="MissingTime"
                            value={state.MissingTime}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.MissingTimeErr && <p className={styles.error}>{error.MissingTimeErr}</p>}

                        <label>Landmark :</label>
                        <input
                            type="text"
                            name="Landmark"
                            placeholder="Enter Landmark"
                            value={state.Landmark}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.LandmarkErr && <p className={styles.error}>{error.LandmarkErr}</p>}

                        <label>Identification Mark :</label>
                        <input
                            type="text"
                            name="identification"
                            placeholder="Enter Identification Mark"
                            value={state.identification}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.identificationErr && <p className={styles.error}>{error.identificationErr}</p>}

                        <label>Contact Number <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="text"
                            name="Contact"
                            placeholder="Enter Contact Number"
                            value={state.Contact}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.ContactErr && <p className={styles.error}>{error.ContactErr}</p>}


                        <label>Do you want to add a Reward? <b style={{ color: "red" }}>*</b>:</label>
                        <div className={styles.radioContainer}>
                            <label>
                                <input
                                    type="radio"
                                    name="Reward"
                                    value="Yes"
                                    onChange={handleChange}
                                    checked={state.Reward === "Yes"}
                                /> Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Reward"
                                    value="No"
                                    onChange={handleChange}
                                    checked={state.Reward === "No"}
                                /> No
                            </label>
                        </div>
                        {error.RewardErr && <p className={styles.error}>{error.RewardErr}</p>}

                        {state.Reward === "Yes" && (
                            <div className={styles.rewardOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="RewardType"
                                        value="Amount"
                                        onChange={handleChange}
                                        checked={state.RewardType === "Amount"}
                                    /> Enter Amount
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="RewardType"
                                        value="Substantial"
                                        onChange={handleChange}
                                        checked={state.RewardType === "Substantial"}
                                    /> Substantial reward will be given
                                </label>
                                {state.RewardType === "Amount" && (
                                    <input
                                        type="text"
                                        name="RewardAmount"
                                        placeholder="Enter Reward Amount"
                                        value={state.RewardAmount}
                                        onChange={handleChange}
                                        className={styles.inputField}
                                    />
                                )}
                            </div>
                        )}
                        {error.RewardTypeErr && <p className={styles.error}>{error.RewardTypeErr}</p>}

                        {/* Submit Button */}
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>

                </div>
            )}
            {(state.foundClicked === true) && (
                <div className={styles.inputsContainer}>
                    <div>
                        <div>
                            <textarea
                                value={state.textAreaInput}
                                onChange={handleTextAreaChange}
                                placeholder="Paste found pet details here..."
                                className={styles.responsiveTextarea}
                            />
                        </div>
                        <div className={styles.autoFillBtnContainer}>
                            <button className={styles.autoFillButton} title='Click to autofill the data' onClick={handleAutofillFound}>Autofill</button>
                            <div className={styles.copyContainer}>
                                <button onClick={() => handleCopy(foundText)} title="Click to copy text" className={styles.copyIcon}>
                                    <IoCopyOutline size={18} />
                                </button>

                                {copied && (
                                    <span className={styles.copiedText}>
                                        Copied to Clipboard!
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>
                    <form className={styles.formContainer} onSubmit={handleFoundSubmit}>


                        {/* Select Pet Type */}
                        <label>Select Pet <b style={{ color: "red" }}>*</b>:</label>
                        <Select
                            options={PetOptions}
                            placeholder="-- SELECT PET TYPE --"
                            onChange={handleSelectChangeFound}
                            isSearchable={true}
                            className={styles.select_option}
                            menuPosition="fixed"
                            value={PetOptions.find(option => option.value === state.FoundpetType) || null}
                        />
                        {error.FoundpetTypeErr && <p className={styles.error}>{error.FoundpetTypeErr}</p>}

                        <label>Heading :</label>
                        <input
                            type="text"
                            name="FoundHeading"
                            placeholder="Enter Custom Heading"
                            value={state.FoundHeading}
                            onChange={handleChange}
                            className={styles.inputField}
                        />

                        <label>Expected Age :</label>
                        <input
                            type="text"
                            name="ExpectedAge"
                            placeholder="Enter Pet Expected Age"
                            value={state.ExpectedAge}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.ExpectedAgeErr && <p className={styles.error}>{error.ExpectedAgeErr}</p>}

                        <label>Gender :</label>
                        <input
                            type="text"
                            name="FoundGender"
                            placeholder="Enter Gender"
                            value={state.FoundGender}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundGenderErr && <p className={styles.error}>{error.FoundGenderErr}</p>}

                        <label>Breed :</label>
                        <input
                            type="text"
                            name="FoundBreed"
                            placeholder="Enter Breed"
                            value={state.FoundBreed}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundBreedErr && <p className={styles.error}>{error.FoundBreedErr}</p>}



                        <label>Collar Color :</label>
                        <input
                            type="text"
                            name="FoundCollar"
                            placeholder="Enter Collar Color"
                            value={state.FoundCollar}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundCollarErr && <p className={styles.error}>{error.FoundCollarErr}</p>}

                        <label>Found Place <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="text"
                            name="FoundPlace"
                            placeholder="Enter Found Place"
                            value={state.FoundPlace}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundPlaceErr && <p className={styles.error}>{error.FoundPlaceErr}</p>}

                        <label>Found Date <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="date"
                            name="FoundDate"
                            value={state.FoundDate}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundDateErr && <p className={styles.error}>{error.FoundDateErr}</p>}

                        <label>Found Time :</label>
                        <input
                            type="time"
                            name="FoundTime"
                            value={state.FoundTime}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundTimeErr && <p className={styles.error}>{error.FoundTimeErr}</p>}

                        <label>Landmark :</label>
                        <input
                            type="text"
                            name="FoundLandmark"
                            placeholder="Enter Landmark"
                            value={state.FoundLandmark}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundLandmarkErr && <p className={styles.error}>{error.FoundLandmarkErr}</p>}

                        <label>Identification Mark :</label>
                        <input
                            type="text"
                            name="FoundIdentification"
                            placeholder="Enter Identification Mark"
                            value={state.FoundIdentification}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.FoundIdentificationErr && <p className={styles.error}>{error.FoundIdentificationErr}</p>}

                        <label>Rescuer's Contact Number <b style={{ color: "red" }}>*</b>:</label>
                        <input
                            type="text"
                            name="RescuerContact"
                            placeholder="Enter Rescuer's Contact Number"
                            value={state.RescuerContact}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                        {error.RescuerContactErr && <p className={styles.error}>{error.RescuerContactErr}</p>}

                        {/* Submit Button */}
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>

                </div>
            )}
        </div>
    );
};

export default PosterInputs;
