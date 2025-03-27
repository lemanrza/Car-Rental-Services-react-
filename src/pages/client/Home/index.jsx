import React from 'react'
import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './home.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Home = () => {
  return (
    <>
      <section className="h-screen bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Rent a Car with Ease – Affordable, Reliable, & Convenient
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              Find the perfect car for your journey with our hassle-free rental service.
              Whether it's a road trip, business travel, or daily commute, we offer a
              wide range of well-maintained vehicles at unbeatable prices. Book now and
              drive with confidence!
            </p>

            <div className="mt-4 md:mt-8">
              <Link to={"/cars"}
                className="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
              >
                Get Started to Rent
              </Link>
            </div>
          </div>
        </div>

        <img
          alt=""
          src='https://scontent.fllk1-8.fna.fbcdn.net/v/t1.6435-9/154846099_2884872568452478_1546447262262932074_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=9CIM3DNLYZgQ7kNvgG9Ji1P&_nc_oc=AdlqjH1-lULf5zcQgyJ3eatwwpLyi3GNhM_GLBLnqxzPUvEZRc_SzEcSkBgKAmyqQ44&_nc_zt=23&_nc_ht=scontent.fllk1-8.fna&_nc_gid=ZtQDc0qB0bDjWZTiBhQtyw&oh=00_AYFkxxk-R5eo50NjguTfX4znFiAM8fRuzf_4G9dVeFgVtA&oe=680CFBF5'
          className="w-full   object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
      <div className='swiper-body'>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><img src="https://orangecoastcarservice.com/wp-content/uploads/2024/08/IMG-20240815-WA0045.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://cabistanbul.com/storage/4947/luxury-car-2.png" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://luxonw.com/images/carFleet/our-fleet.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img src="https://cabistanbul.com/storage/4947/luxury-car-2.png" alt="" /></SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Home