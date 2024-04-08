
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { searchUsersByPseudo } from '../../services/ChatGroup';


const AddPeopleDialog = ({ open, handleClose, onAdd }) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        let active = true;

        // Lance la recherche uniquement si inputValue a au moins 2 caractères
        if (inputValue.length < 2) {
            setOptions(selectedUsers); // Vous pourriez vouloir garder les utilisateurs déjà sélectionnés visibles
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
    }, [inputValue, selectedUsers]); // Ajoutez selectedUsers aux dépendances si vous souhaitez réinitialiser les options lorsque cela change


    // Gestionnaire pour la sélection des utilisateurs
    const handleSelectUsers = async (event, newSelectedUsers) => {
        // Mise à jour des utilisateurs sélectionnés
        setSelectedUsers(newSelectedUsers);
        console.log(newSelectedUsers);
    };

    const handleAddClick = () => {
        onAdd(selectedUsers); // Appelle la fonction onAdd avec les utilisateurs sélectionnés
        setSelectedUsers([]); // Réinitialise les utilisateurs sélectionnés
        handleClose(); // Ferme le dialogue
    };

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
                    options={[...new Set([...options, ...selectedUsers])]} // Combine et dédoublonne les options et les utilisateurs sélectionnés
                    getOptionLabel={(option) => option.name || option.username} // Adapté selon vos données
                    filterSelectedOptions
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    onChange={handleSelectUsers} // Utilisez l'événement onChange pour la sélection
                    value={selectedUsers} // Assure que les utilisateurs sélectionnés sont toujours considérés comme valides
                    isOptionEqualToValue={(option, value) => option.id === value.id && option.name === value.name} // Vérifie l'égalité basée sur l'id et le nom
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Users"
                        />
                    )}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddClick}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPeopleDialog;
