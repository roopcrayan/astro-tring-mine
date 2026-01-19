import React from 'react'
import faviconlogo from "@/assets/favicon.png";

const HeadWithLogo = ({ time,title }) => {
    return (
        <div className='text-center py-5 md:mb-8 mb-4 container'>
            <div className='mb-6'>
                <h2>{title}</h2>
                <p>Check your {time}'s horoscope</p>
            </div>
            <div className='h-[2px] w-full bg-secondary '>
                <img src={faviconlogo} alt="Logo" className='mx-auto w-[50px] -translate-y-[50%]' />
            </div>
        </div>
    )
}

export default HeadWithLogo
