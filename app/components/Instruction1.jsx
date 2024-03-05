import React from 'react';

const Instruction1 = ( { onPreviousClick, onNextClick, HrColor, startSeconds, containerBorder } ) => {

  const formattedStartSeconds = String(startSeconds).padStart(2, '0');

  const timerColorClass = startSeconds <= 5 ? 'text-red-500 brightness-125' : '';

  return (
    <div className={`relative mt-40 mb-20 ml-5 mr-5 border-2 ${containerBorder}`}>
      <div id="instruction1-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <div className={`text-2xl flex items-center justify-center absolute inset-x-0 ${timerColorClass}`}>
          00:{formattedStartSeconds}
        </div>
        <br />
        <hr className={`m-3 ${HrColor}`} />
        <div className="mb-5 text-2xl">
        Answer multiple-choice questions by clicking or tapping your choice.
                You begin with {startSeconds} seconds on the clock.
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
                <p></p>
                <p ></p>
                <button id="instruction1-previous" className="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onPreviousClick}>Previous</button>
                <button id="instruction1-next" className="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onNextClick}>Next</button>
            </div>
      </div>
    </div>
  );
};

export default Instruction1;
