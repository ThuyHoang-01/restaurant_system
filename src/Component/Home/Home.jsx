import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import AboutUs from './AboutUs/AboutUs'
import IdontKnow from './IDontKnow/IdontKnow'
import ReviewFromCustomer from './ReviewFromCustomer/ReviewFromCustomer'
import Slide from './Slide/Slide'
import SpecialProduct from './SpecialProduct/SpecialProduct'

const Home = (props) => {
  return (
    <div style={{width: "100%"}}>
        <Header />
        <Slide />
        <AboutUs />
        <IdontKnow />
        <SpecialProduct />
        <ReviewFromCustomer />
        <Footer />
    </div>
  )
}

export default Home