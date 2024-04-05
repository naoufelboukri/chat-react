import './Message.css';
const Message = ({from, children, time}) => {
    return (
        <div className={from ? 'message' : 'message message-me'}>
            <h3>{from ?? 'Moi'}</h3>
            <p>{children}</p>
            <span className={'message-time'}>{time}</span>
        </div>
    )
}

export default Message;
