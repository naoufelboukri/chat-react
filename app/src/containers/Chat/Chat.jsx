import Message from "../../components/Message/Message.jsx";

import './Chat.css';
import Button from "../../components/Button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
const Chat = () => {

    const sendMessage = (event) => {
        event.preventDefault();
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <h4>ETNA</h4>
            </div>
            <div className="chat-main">
                <Message from={'Abdou'} time={'11h34'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ipsam molestias mollitia, nemo porro quaerat ratione saepe sit tenetur vitae? A commodi doloremque sunt!
                </Message>
                <Message time={'11h36'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, natus nemo nisi nulla officia recusandae tempore.
                </Message>
                <Message from={'Jiong'} time={'12h21'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam animi, consequuntur debitis error et explicabo ipsam, ipsum iusto mollitia natus nisi nobis, odio repellendus repudiandae sapiente soluta vitae voluptatibus!
                </Message>
            </div>
            <form className="chat-footer" onSubmit={sendMessage}>
                <textarea name="chat-input" placeholder={'Enter your message'}></textarea>
                <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </form>
        </div>
    )
}

export default Chat;
