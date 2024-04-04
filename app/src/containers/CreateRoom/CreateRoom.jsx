import {faTag} from "@fortawesome/free-solid-svg-icons";

import Input from "../../components/Input/Input.jsx";
import Chip from "../../components/Chip/Chip.jsx";
import './CreateRoom.css';

const CreateRoom = () =>
    <form className="createRoom">
        <h3>Create a new room</h3>

        <div className="field">
            <label htmlFor="roomName">Room name<span>*</span></label>
            <Input type={'text'} placeholder={'Enter a name'} fa={faTag}/>
        </div>

        <div className="field">
            <Chip label={'Select users'} id={'user_chip'}/>
        </div>
    </form>

export default CreateRoom;
