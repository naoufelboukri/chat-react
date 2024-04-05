import { faTag } from "@fortawesome/free-solid-svg-icons";

import Input from "../../components/Input/Input.jsx";
import SelectMultiple from "../../components/SelectMultiple/SelectMultiple.jsx";
import './CreateRoom.css';
import Button from "../../components/Button/Button.jsx";
import { useState, useContext, useEffect } from "react";

// Service firebase
import { createChatGroup } from "../../services/ChatGroup.jsx";

// Context
import { useAuth } from "../../contexts/AuthContext.jsx";

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const CreateRoom = () => {

    const [roomName, setRoomName] = useState('');
    const [users, setUsers] = useState([]);

    const { currentUser, isFetching } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(roomName);
        console.log(users);
        try {
            if (roomName !== '') {
                const response = await createChatGroup(roomName, currentUser.uid, users);

                console.log(response);
            }
        } catch (error) {
            console.error("Error creating a room:", error);
        }
    }

    useEffect(() => {
        console.log("currentUser: ", currentUser.uid);
    }, [currentUser]);

    return (
        <form className="createRoom" onSubmit={handleSubmit}>
            <h3>Create a new room</h3>

            <div className="field">
                <label htmlFor="roomName">Room name<span>*</span></label>
                <Input
                    type={'text'}
                    placeholder={'Enter a name'}
                    fa={faTag}
                    value={roomName}
                    set={value => setRoomName(value)}
                />
            </div>

            <div className="field">
                <SelectMultiple
                    values={names}
                    selectedValues={users}
                    set={selectedValues => setUsers(selectedValues)}
                />
            </div>

            <Button>Create a room</Button>
        </form>
    )
}

export default CreateRoom;
