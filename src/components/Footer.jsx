import faviconlogo from "@/assets/favicon.png";
import { Mail, MapPin, Phone } from 'lucide-react';
import { TiSocialFacebook } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { FaAnglesRight } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className='bg-accent-foreground pt-10 pb-0'>
      <div className="container">
        <div>
          <div className="border-b border-gray-500 pb-4 mb-4">
            <Link to="/">
              <img src={faviconlogo} className="xl:h-15 md:h-12  h-10 mb-2" alt="" />
            </Link>
            <div className='space-y-2'>

              <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>About Astrology</h2>
              <p className='text-white text-sm! '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sit consequatur ipsam ex atque delectus nulla animi nostrum? Error, voluptatem? Aspernatur asperiores alias eum temporibus pariatur ipsam cumque facilis repellendus! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt eveniet sunt ut dolor laudantium iure omnis soluta laboriosam enim quae.</p>
            </div>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3  grid-cols-1 gap-4 pb-10">
            <div className='space-y-5'>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>About Astrology</h2>

                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2  '><Link to={""} ><FaAnglesRight className="me-2 inline" /> Today's Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Today's Love Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Yesterday's Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Tomorrow's Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Weekly Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Monthly Horoscope</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Yearly Horoscope</Link></li>
                </ul>
              </div>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Shubh Muhurat 2025</h2>

                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Annanprashan Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Naamkaran Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Car/Bike Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Marriage Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Gold Buying Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Bhoomi Pujan Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Griha Pravesh Muhurat 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Mundan Muhurat 2025</Link></li>

                </ul>
              </div>
            </div>
            <div className='space-y-5'>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Important Links</h2>

                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astromall</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrotalk Store</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Today Panchang</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Live Astrologers</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> How to read kundali</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Free Kundli</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Kundli Matching</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Chat with Astrologer</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Talk to Astrologer</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrotalk Reviews</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrology Yoga</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Kaalsarp Doshas</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Child Astrology</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Ascendant Sign Gemstone</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Nakshatras Constellations</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Numerology</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Mantras</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrological remedies for job promotion</Link></li>

                </ul>
              </div>

            </div>
            <div className='space-y-5'>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Important Links</h2>

                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Collaboration</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Tarot</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Zodiac Signs</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Vastu Shastra</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Love Calculator</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Guru Purnima 2025</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrotalk Sitemap</Link></li>

                </ul>
              </div>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Shop our products</h2>

                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Evil Eye</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Rudraksha</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Karungali</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Buy Gemstones </Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Pyrite</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Selenite</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Rudraksha Bracelet For Men</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Rudraksha Bracelet For Women</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Murtis and Idols</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Raw Pyrite Stone</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Money Magnet Bracelet</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Joint Pain Oil</Link></li>


                </ul>
              </div>
            </div>
            <div className='space-y-5'>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Astrologer</h2>
                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Astrologer Login</Link></li>
                    <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={"/astro-regiter"} ><FaAnglesRight className="me-2 inline" /> Astrologer Registration</Link></li>
                </ul>
              </div>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Corporate Info</h2>
                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Refund & Cancellation Policy</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Terms & Conditions</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Privacy Policy</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Disclaimer</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> About Us</Link></li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2'><Link to={""} ><FaAnglesRight className="me-2 inline" /> Pricing Policy</Link></li>
                </ul>
              </div>
              <div>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Contact us</h2>
                <ul className='mt-2'>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex gap-2 items-center'>
                    <MapPin className='border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full' />
                    <p>
                      711, Plot A09, ITL Towers, Netaji Subhash Place, Pitampura,
                      Delhi 110034
                    </p>
                  </li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex items-center gap-2'>
                    <Mail className='border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full' />
                    <p>reachus@krayons.co.in</p>
                  </li>
                  <li className='text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex items-center gap-2'>
                    <Phone className='border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full' />
                    <p>+91 23465 12356</p>
                  </li>
                </ul>
                <h2 className='text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg '>Social Links</h2>
                <div className="flex gap-3 mt-3">
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center " >
                      <TiSocialFacebook className="size-7 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center " >
                      <SlSocialInstagram className="size-5 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center " >
                      <TiSocialTwitter className="size-6 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center " >
                      <TiSocialYoutube className="size-5 " />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className=" bg-black text-white text-center py-5 mt-5">
        Copyright  { new Date().getFullYear() } Astrology (Powered by Astrology Services Private Limited). All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer