import React from 'react'
import Slider from 'react-slick'
import { settings } from '../Slide/Slide'

const SpecialProduct = () => {
  return (
    <div style={{width: "100%", padding: 10}}>
        <div style={{textAlign: "center", fontWeight: 700, fontSize: 48, margin: "16px 0"}}>
            Sản phẩm đặc biệt
        </div>
        <div style={{width: "100%", padding: "3rem 20%"}}>
            <Slider {...settings}>
                <img style={{borderRadius: 10}} src="https://res.cloudinary.com/cockbook/image/upload/v1676560166/Screenshot_2023-02-16_220847_hhxker.png" alt="" />
                <img src="https://res.cloudinary.com/cockbook/image/upload/v1676560165/Screenshot_2023-02-16_220904_a5jyn5.png" alt="" />
            </Slider>
        </div>
    </div>
  )
}

export default SpecialProduct