import React from 'react'
import Slider from 'react-slick'
import { settings } from '../Slide/Slide'

const ReviewFromCustomer = () => {
  return (
    <div style={{width: "100%", padding: 10, background: "#ffa323"}}>
        <div style={{textAlign: "center", fontWeight: 700, fontSize: 48, margin: "16px 0"}}>
            Đánh giá từ khách hàng
        </div>
        <div style={{width: "100%", padding: "3rem 20%"}}>
            <Slider {...settings}>
                <img style={{borderRadius: 10}} src="https://res.cloudinary.com/cockbook/image/upload/v1676560504/Screenshot_2023-02-16_221449_htxlnk.png" alt="" />
                <img src="https://res.cloudinary.com/cockbook/image/upload/v1676560505/Screenshot_2023-02-16_221438_tozike.png" alt="" />
                <img src="https://res.cloudinary.com/cockbook/image/upload/v1676560504/Screenshot_2023-02-16_221430_cdglws.png" alt="" />
            </Slider>
        </div>
    </div>
  )
}

export default ReviewFromCustomer