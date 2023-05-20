import React from 'react'
import Slider from 'react-slick';


export const settings = {
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
};
const Slide = () => {
  return (
    <div style={{width: "100%", overflowX: "hidden"}}>
      <Slider {...settings}>
        <img src="https://res.cloudinary.com/cockbook/image/upload/v1683211467/single/Screenshot_2023-05-04_214256_mcms1e.png" alt="" />
        <img src="https://res.cloudinary.com/cockbook/image/upload/v1683211466/single/Screenshot_2023-05-04_214322_hioqkj.png" alt="" />
        <img src="https://res.cloudinary.com/cockbook/image/upload/v1683211468/single/Screenshot_2023-05-04_214309_rl7i1b.png" alt="" />
      </Slider>
    </div>
  )
}

export default Slide