import styles from './PosterInputs.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import Select from 'react-select';
import { useState } from 'react';

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
    });


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
        if (!state.Age.trim()) {
            errors.AgeErr = "Age is required";
            isValid = false;
        }
        // }
        if (state.Gender.length !== 0) {
            if (!state.Gender.trim()) {
                errors.GenderErr = "Gender is required";
                isValid = false;
            }
        }
        if (state.Breed.length !== 0) {
            if (!state.Breed.trim()) {
                errors.BreedErr = "Breed is required";
                isValid = false;
            }
        }
        // if (state.Collarcolor.length !== 0) {
        if (!state.Collarcolor.trim()) {
            errors.CollarcolorErr = "Collar color is required";
            isValid = false;
        }
        // }
        if (!state.Missingplace.trim()) {
            errors.MissingplaceErr = "Missing place is required";
            isValid = false;
        }
        if (!state.MissingDate.trim()) {
            errors.MissingDateErr = "Missing date is required";
            isValid = false;
        }
        if (state.MissingTime.length !== 0) {
            if (!state.MissingTime.trim()) {
                errors.MissingTimeErr = "Missing time is required";
                isValid = false;
            }
        }
        if (!state.Landmark.trim()) {
            errors.LandmarkErr = "Landmark is required";
            isValid = false;
        }
        if (state.identification.length !== 0) {
            if (!state.identification.trim()) {
                errors.identificationErr = "Identification mark is required";
                isValid = false;
            }
        }
        if (!state.Contact.trim()) {
            errors.ContactErr = "Contact number is required";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", state);
            navigate("/generateposter", { state: state });
        }
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        if (state.missingClicked === false && state.foundClicked === false) {
            navigate('/');
        }
        else {
            setState({ ...state, missingClicked: false, foundClicked: false })
        }
    }
    const [textAreaInput, setTextAreaInput] = useState("");

    const handleTextAreaChange = (e) => {
        setTextAreaInput(e.target.value);
    };

    const handleAutofill = () => {
        const parsedData = parseTextData(textAreaInput);
        setState(prevState => ({ ...prevState, ...parsedData }));
    };

    const parseTextData = (text) => {
        const data = {};
        const regexMapping = {
            Name: /Name:\s*(.*)/,
            Breed: /Breed:\s*(.*)/,
            Age: /Age:\s*(.*)/,
            Gender: /Gender:\s*(.*)/,
            Neutered: /(Neutered)/,
            Collarcolor: /Collar colour:\s*(.*)/,
            Missingplace: /Last Seen:\s*(.*) on/,
            MissingDate: /on (\d{1,2}[a-zA-Z]* \w+ \d{4}) at/,
            MissingTime: /at (\d{1,2}[ap]m)/,
            Contact: /Contact:\s*(\d+)/,
            RewardAmount: /Reward:\s*Rs ([\d,]+)/
        };

        Object.keys(regexMapping).forEach((key) => {
            const match = text.match(regexMapping[key]);
            if (match) {
                data[key] = match[1] || "Yes";
            }
        });

        return data;
    };
    return (
        <div className={styles.overallContainer}>
            <button className={styles.backButton} onClick={handleBackClick}>BACK</button>
            <div className={styles.container}>
                {!state.foundClicked && <button className={styles.actionButton} onClick={() => setState({ ...state, missingClicked: true })}>Missing Pet Poster</button>}
                {!state.missingClicked && <button className={styles.actionButton} onClick={() => setState({ ...state, foundClicked: true })}>Lost Pet Found Poster</button>}
            </div>

            {(state.missingClicked === true) && (
                <div className={styles.inputsContainer}>
<div>
<div>
                            <textarea
                                value={textAreaInput}
                                onChange={handleTextAreaChange}
                                placeholder="Paste missing pet details here..."
                                className={styles.responsiveTextarea}
                            />
                        </div>
                        <button onClick={handleAutofill}>Autofill</button>
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

                        <label>Age <b style={{ color: "red" }}>*</b>:</label>
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
                                <input type="radio" name="Neutered" value="Yes" onChange={handleChange} checked={state.Neutered === "Yes"} /> Yes
                            </label>
                            <label>
                                <input type="radio" name="Neutered" value="No" onChange={handleChange} checked={state.Neutered === "No"} /> No
                            </label>
                        </div>
                        {error.NeuteredErr && <p className={styles.error}>{error.NeuteredErr}</p>}

                        <label>Collar Color <b style={{ color: "red" }}>*</b>:</label>
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

                        <label>Landmark <b style={{ color: "red" }}>*</b>:</label>
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
        </div>
    );
};

export default PosterInputs;
