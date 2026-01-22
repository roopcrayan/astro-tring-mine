import React from 'react'
import ComponentHead from '../ComponentHead'
import { Link } from 'react-router-dom'
import { PiSunHorizonBold } from "react-icons/pi";
import { BsArrowThroughHeart } from "react-icons/bs";
import { GiBigDiamondRing } from "react-icons/gi";
const Services = () => {
    return (
        <section>
            <div className="container">
                <ComponentHead
                    heading='Complimentary astrology services'
                    title='We offer free consultations to help you understand your birth chart and its implications.'
                />
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-10">
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <PiSunHorizonBold className='size-12 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <BsArrowThroughHeart className='size-9 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <GiBigDiamondRing className='size-12 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <PiSunHorizonBold className='size-12 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <BsArrowThroughHeart className='size-9 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>
                    <div className="
                    p-6  border shadow-primary  group shadow rounded-md text-center overflow-hidden hover:scale-101  transition-shadow duration-300
                    relative before:content-[''] before:absolute bg-primary/15   before:bg-primary/10      before:transition-all before:duration-300 
                    before:left-[-50%] before:top-0 before:h-full before:w-full hover:before:left-0 
                    ">
                        <div className='h-16 w-16 bg-black mx-auto flex items-center justify-center rounded-full mb-4   transition-colors duration-300'>
                            <GiBigDiamondRing className='size-12 text-white' />
                        </div>

                        <h3 className="text-xl font-semibold ">Birth Chart Analysis</h3>
                        <p>Get a detailed analysis of your birth chart to understand your personality, strengths, and challenges.</p>
                        <Link className='text-secondary group-hover:underline'>Read more</Link>
                    </div>




                </div>
            </div>
        </section>
    )
}

export default Services
