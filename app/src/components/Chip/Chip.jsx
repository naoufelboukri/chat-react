import './Chip.css';
import {useEffect, useRef} from "react";

const Chip = ({ label, id }) => {
    const input = useRef(null);
    useEffect(() => {

    }, )
    return (
        <div id="chip">
            <input type="text" ref={input} onChange={onchange}/>
        </div>
    )
}


// J'essaie de mettre un autocomplete pour pouvoir faire par la suite la méthode de :
// https://levelup.gitconnected.com/structure-firestore-firebase-for-scalable-chat-app-939c7a6cd0f5
//     https://codepen.io/vank0/pen/oBMJvL
export default Chip;
