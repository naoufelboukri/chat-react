import {motion} from 'framer-motion';
import logo from "../../assets/logo.png";

import './AnimatedLogo.css';

const AnimatedLogo = () => {

    const title = 'Securely Connect Now'.split('').map((letter, index) =>
        <motion.span
            initial={{y: '100%'}}
            animate={{y: '0'}}
            transition={{delay: .5+index/32}}
            key={index}
            style={{ display: 'inline-block', width: letter === ' ' ? '0.5em' : 'auto' }}
        >
            {letter}
        </motion.span>
    )

    return (
        <div className="AnimatedLogo">
            <img src={logo}/>
            <h1>{title}</h1>
        </div>
    );
}

export default AnimatedLogo;
