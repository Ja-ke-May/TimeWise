import React from 'react';

const EndQuizContainer = ({ finalScore, finalTime }) => {
  return (
    <section id="end-container" className="hidden p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <p id="end-message" className="text-2xl flex items-center justify-center absolute inset-x-0">
        Congratulations!
      </p>
      <br />
      <hr className="border-pink-500 m-3" />
      <p id="end-message1" className="flex items-center justify-center mb-5 text-2xl">
        You've Completed the Quiz!
      </p>
      <div className="flex flex-col items-center justify-center m-5">
        <p className="m-2">Your Score: {finalScore}</p>
        <p id="secs" className="m-2">Your Time: {finalTime} seconds</p>
        <p></p>
        <button id="end-next" className="bg-pink-500 text-white text-center px-3 py-2 rounded m-2">
          Back to Start
        </button>
      </div>
    </section>
  );
};

export default EndQuizContainer;