import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const genderList = ["Nam", "Nữ"]
const AutoCompleteGender = ({ gender, registerName }) => {
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        setValue(gender)
        setIsLoading(false)
    }, [gender])
    return (
        <>
            {!isLoading &&
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    disableClearable
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={genderList}
                    renderInput={(params) => <TextField {...params} {...registerName} />}
                />
            }
        </>

    )
}

export default AutoCompleteGender