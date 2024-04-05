import './Control.css';

const Control = ({ room, active, setActive }) => {

    return (
        <li className={active ? 'Control Control-active' : 'Control'} onClick={setActive}>
            {room.name[0].toUpperCase()}
        </li>
    );
}

export default Control;
