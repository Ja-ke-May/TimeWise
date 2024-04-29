import React from 'react';

const Competition = ({ }) => {
  return (
    <div className="relative mt-20 mb-20 ml-5 mr-5">
    <div id="competition-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white">
   
      <h1 className="text-xl md:text-2xl text-pink-500 brightness-125 flex items-center justify-center absolute inset-x-0">
        Competition Time!
      </h1>
      <br />
      <hr className="m-3 border-pink-500" />
      <div className='md:text-lg'>
      <h2 className="mb-2">
      Get ready to <span className='md:text-xl brightness-125 border-b-2 border-pink-500'>WIN BIG</span> with TimeWise!</h2>
      <p className="mb-2">
Test your knowledge on any of the 7 quiz types(General Knowledge, Music, Geography...) for a chance to win up to <span className='md:text-xl brightness-125 border-b-2 border-pink-500'>£100</span> per week – <span className='md:text-xl brightness-125 border-b-2 border-pink-500'>no sign-up needed and unlimited entries!</span></p>
<p className="mb-4">

Winners of each weekly quiz can claim <span className='md:text-xl brightness-125 border-b-2 border-pink-500'>£10</span> in 'no strings attached' prize money. Plus, win on 7 consecutive days, and we'll add an extra <span className='md:text-xl brightness-125 border-b-2 border-pink-500'>£30</span> to your winnings, totaling a whopping £100 a week.</p>
<p className="mb-4">

<span className='md:text-xl brightness-125 border-b-2 border-pink-500 '>To get started</span>  
<br />  

Add your name to any leaderboard and note your <span className='text-pink-100'>REF</span> number.
If you top the weekly leaderboard when the questions change, you win!</p>
<p className="mb-4">
<span className='md:text-xl brightness-125 border-b-2 border-pink-500'>Claiming your prize is simple</span>
<br />    
Just message us your leaderboard name, quiz type and <span className='text-pink-100'>REF</span> number via  <a href="mailto:info@timewisequiz.com" className="hover:text-pink-500" title='email'>info@timewisequiz.com</a> or <a href="https://www.instagram.com/timewisequiz/" title="Instagram" className='hover:text-pink-500'>Instagram direct message</a>.
</p>
<p className="md:text-xl mb-2">
Questions? Reach out anytime.
</p>
<p className="md:text-xl mb-2">
Thanks for being a part of TimeWise – let's make every second count towards your winning streak!
      </p>
      </div>
    </div>
    </div>
  );
};

export default Competition;
