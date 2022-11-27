import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const Calendar = ({ registerName, dateOfBirth }) => {
    const [value, setValue] = React.useState(dateOfBirth);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDatePicker
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField  {...params}   {...registerName} />}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default Calendar