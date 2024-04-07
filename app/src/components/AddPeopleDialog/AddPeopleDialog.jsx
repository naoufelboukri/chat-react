
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { searchUsersByPseudo } from '../../services/ChatGroup';


const AddPeopleDialog = ({ open, handleClose, users }) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions([]);
            return undefined;
        }
        
        (async () => {
            const response = await searchUsersByPseudo(inputValue);
            const uniqueOptions = response.filter(
                (option, index, self) =>
                    index === self.findIndex((t) => t.id === option.id && t.name === option.name)
            );

            if (active) {
                setOptions(uniqueOptions);
            }
        })();

        return () => {
            active = false;
        };
    }, [inputValue]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{ '& .MuiDialog-paper': { width: '500px', maxWidth: 'none' } }} // Applique un style pour agrandir le Dialog
        >
            <DialogTitle>Add People</DialogTitle>
            &nbsp;
            <DialogContent>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={options}
                    getOptionLabel={(option) => option.name || option.username} // Adapté selon vos données
                    filterSelectedOptions
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // label="Select Users"
                            placeholder="Users"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPeopleDialog;
