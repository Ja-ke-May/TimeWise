import React from 'react';
import Link from 'next/link';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="footer" className="relative flex flex-col w-full bg-black/80 text-white text-center text-opacity-60 justify-center items-center mt-40 pt-5 pb-5 pr-1 pl-1">
      <img className='h-20 w-20 motion-safe:animate-pulse' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
      <a href="https://www.instagram.com/timewisequiz/" title="Instagram"><img className='h-12 w-12 m-4 mt-5 opacity-60 hover:border-4 hover:rounded-full hover:border-pink-500 hover:bg-pink-500/50' src="images/instagram-icon.png" alt="Instagram" /></a>
      <a href="mailto:info@timewisequiz.com" className="hover:text-pink-500 text-2xl block mt-2" title='email'>info@timewisequiz.com</a>
      <hr className="border-pink-500 w-1/2 m-4" />

      <Link href="http://www.videezy.com/">
        <p className="hover:text-pink-500" alt="Videezy Website">
          Free B Roll by Videezy.com
        </p>
      </Link>

      <Link href="https://www.youtube.com/watch?v=avu3ildd94g">
        <p className="hover:text-pink-500" alt="Inspiring Cinematic Ambient - Aleksey Chistilin">
          Inspiring Cinematic Ambient - Aleksey Chistilin [No Copyright Music]
          Song: Inspiring Cinematic Ambient - Aleksey Chistilin
          Music promoted by Sound Studio
        </p>
      </Link>

      <hr className="border-pink-500 w-1/2 m-4" />

      <a onClick={scrollToTop} className="hover:text-pink-500 text-lg">Back to Top</a>
    </div>
  );
};

export default Footer;
