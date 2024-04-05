import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import './SelectMultiple.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SelectMultiple = ({values, set}) => {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
        set(value);
    };

    return (
        <FormControl sx={{gap: '10px', maxWidth: '520px'}}>
            <label htmlFor="users">Invite users</label>
            <Select
                id="demo-multiple-chip"
                value={personName}
                onChange={handleChange}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} sx={{color: '#fff'}}/>
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                multiple
                sx={{
                    border: '2px solid grey',
                    borderRadius: '6px',
                    boxShadow: "none",
                    outline: 'none',
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                            border: 0,
                        },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            border: 0,
                        },
                }}
            >
                {values.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default SelectMultiple;
