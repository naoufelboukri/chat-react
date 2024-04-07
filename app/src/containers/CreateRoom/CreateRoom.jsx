import { faTag } from "@fortawesome/free-solid-svg-icons";

import Input from "../../components/Input/Input.jsx";
import SelectMultiple from "../../components/SelectMultiple/SelectMultiple.jsx";
import './CreateRoom.css';
import Button from "../../components/Button/Button.jsx";
import { useState, useEffect } from "react";

// Service firebase
import { createChatGroup } from "../../services/ChatGroup.jsx";

// Context
import { useAuth } from "../../contexts/AuthContext.jsx";

const CreateRoom = ({ closeModal }) => {

    const [roomName, setRoomName] = useState('');

    const { currentUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (roomName !== '') {
                await createChatGroup(roomName, currentUser);
                setRoomName('');
                closeModal();
            }
        } catch (error) {
            console.error("Error creating a room:", error);
        }
    }

    useEffect(() => {
        console.log("currentUser: ", currentUser);
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

            {/* <div className="field">
                <SelectMultiple
                    values={names}
                    selectedValues={users}
                    set={selectedValues => setUsers(selectedValues)}
                />
            </div> */}

            <Button>Create a room</Button>
        </form>
    )
}

export default CreateRoom;
