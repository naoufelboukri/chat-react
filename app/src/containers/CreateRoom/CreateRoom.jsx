import './CreateRoom.css';
import Input from "../../components/Input/Input.jsx";
const CreateRoom = () =>
    <form className="createRoom">
        <h3>Create a new room</h3>

        <div className="field">
            <label htmlFor="roomName">Room name<span>*</span></label>
            <Input type={'text'} placeholder={'Enter a name'}/>
        </div>
    </form>

export default CreateRoom;
