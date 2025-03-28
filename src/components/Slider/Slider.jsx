import './Slider.scss'

import { useMedia } from 'react-use'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


// Install Autoplay module

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BannerImage1 from '@/images/p2-sm.jpeg';
import BannerImage2 from '@/images/p3-sm.jpeg';
import BannerImage3 from '@/images/p4-sm.jpeg';


const SLIDER_DATA_PC = [
    {
        id: 1,
        imageURL: BannerImage1,
        altText: "Banner Image 1"
    },
    {
        id: 2,
        imageURL: BannerImage2,
        altText: "Banner Image 2"
    },
    {
        id: 3,
        imageURL: BannerImage3,
        altText: "Banner Image 3"
    },
];




const Slider = () => {
    const isLargeScreen = useMedia('(min-width: 500px)');


    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
                clickable: true,
            }}
            navigation={isLargeScreen}
            loop={true}
            autoplay={{
                delay: 3000,   // Time delay between slides in ms (e.g., 3000ms = 3 seconds)
                disableOnInteraction: false,  // Keep autoplay running after user interaction
            }}
            className="mySwiper"
        >
            {
                SLIDER_DATA_PC.map(item => (
                    <SwiperSlide key={item.id}>
                        <div className='centered-content'>
                            <img
                                src={item.imageURL}
                                alt={item.altText}
                                className='fit-image'
                            />
                        </div>
                    </SwiperSlide>
                ))}


        </Swiper>
    )
}

export default Slider