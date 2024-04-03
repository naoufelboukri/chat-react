import backgroundVideo from "../../assets/spirits-blue-bg.mp4";
import './Background.css';
const Background = () =>
    <div className={'background'}>
        <div className="overlay"/>
        <video autoPlay loop muted id={'video_bg'}>
            <source src={backgroundVideo} type={'video/mp4'}/>
        </video>
    </div>

export default Background;