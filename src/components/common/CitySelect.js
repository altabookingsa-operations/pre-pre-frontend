import Select from "react-select";
const CitySelect = ({
    inputValue,
    cityData,
    formData,
    setInputValue,
    setFormData,
    setMenuOpen,
    menuOpen,
    isLoading
 }) => {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            color: "#000",
            opacity: "1",
            border: "none!important",
            outline: "none"
        }),

        singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            opacity: "1", // 👈 FIX: selected text color
        }),

        input: (provided) => ({
            ...provided,
            color: "#fff",
            opacity: "1",// 👈 typing text color
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#888",
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            color: "#000",
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#eee" : "#fff",
            color: "#000",
            cursor: "pointer",
        }),
    };
    return (
        <Select
            className="bg-[#00000038] border border-slate-700 rounded-lg p-2 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]"
            styles={customStyles}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            classNamePrefix="react-select"
            getOptionLabel={(option) =>
                `${option?.cityname} (${option?.countryname})`
            }
            options={inputValue.length >= 3 ? cityData : []}
            value={formData.homeCity}
            inputValue={inputValue}

            onInputChange={(value, { action }) => {
                console.log("input change", value, action);
                if (action === "input-change") {
                    setInputValue(value);
                    setFormData((prev) => ({
                        ...prev,
                        homeCity: null,
                    }));
                }
                if (value?.length > 2) {
                    setMenuOpen(true)
                } else {
                    setMenuOpen(false)
                }
            }}
            onBlur={() => {
                if (formData?.homeCity?.cityname) {
                    setInputValue(`${formData?.homeCity.cityname} (${formData?.homeCity.countryname})`);
                } else {
                    setInputValue('');
                }
            }}
            onFocus={() => {
                if (formData?.homeCity?.cityname) {
                    setInputValue(`${formData?.homeCity.cityname} (${formData?.homeCity.countryname})`);
                } else {
                    setInputValue('')
                }
            }}
            onChange={(option) => {
                setFormData((prev) => ({
                    ...prev,
                    homeCity: option
                }));
                setMenuOpen(false)
                setInputValue(`${option?.cityname} (${option?.countryname})` || "");
            }}
            isLoading={isLoading}
            menuIsOpen={menuOpen}
            placeholder="Type at least 3 letters..."
            noOptionsMessage={() =>
                inputValue.length < 3
                    ? "Type at least 3 characters"
                    : "No results found"
            }
        />
    )
}

export default CitySelect;