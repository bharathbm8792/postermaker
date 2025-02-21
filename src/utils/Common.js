export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? 'var(--border-color)' : 'var(--border-color)',
        boxShadow: state.isFocused ? '0 0 5px var(--primary-color)' : 'none',
        '&:hover': {
            borderColor: state.isFocused ? 'var(--border-color)' : 'var(--border-color)'
        },
        height: '46px',
        alignItems: 'center',
        padding: 0,
    }),

    valueContainer: (provided) => ({
        ...provided,
        height: '46px',
        alignItems: 'center',
        padding: '0px 8px',
    }),

    input: (provided) => ({
        ...provided,
        margin: '0',
        boxShadow: "none"
    }),

    singleValue: (provided) => ({
        ...provided,
        margin: '0',
    }),

    placeholder: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        fontStyle: "italic",
        color: "#aaa",
        fontSize: "10pt",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    }),

    indicatorsContainer: (provided) => ({
        ...provided,
        height: '46px',
        display: 'flex',
        alignItems: 'center'
    }),

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'var(--primary-color)' : state.isFocused ? '#e0e0e0' : 'white',
        color: state.isSelected ? '#fff' : '#000',
        height: '46px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            color: "#000",
            backgroundColor: state.isFocused ? '#e0e0e0' : 'white',
        },
    }),

    // New styles to prevent clipping and manage dropdown position
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,  // Ensure dropdown appears above other components
        maxHeight: "300px", // Optionally set a max height for overflow management
    }),
};