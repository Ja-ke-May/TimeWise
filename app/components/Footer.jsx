import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex flex-col w-full bg-black/80 text-white text-center text-opacity-60 flex justify-center items-center mt-20 pt-5 pb-5">
      <img className='h-20 w-20 motion-safe:animate-pulse' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
      <a href="mailto:Jacob-may@outlook.com" className="hover:text-pink-500 block mt-2">Jacob-may@outlook.com</a>
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
    </div>
  );
};

export default Footer;
