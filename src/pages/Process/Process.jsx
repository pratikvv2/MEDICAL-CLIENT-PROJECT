import './Process.scss';

import { useMedia } from "react-use"
import MainImg from '@/images/Process.png';
import MobileMainImg from '@/images/mobile-process.png';


const Process = () => {
    const isLargeScreen = useMedia('(min-width: 500px)');
    return (
        <div className='centered-content'>
            {isLargeScreen ? (
                <img src={MainImg} className='fit-image' alt="The Flow of appointment process" />
            ) : (
                <img src={MobileMainImg} className='fit-image' alt="The Flow of appointment process" />
            )}
        </div>
    )
}

export default Process