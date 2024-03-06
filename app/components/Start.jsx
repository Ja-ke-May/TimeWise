import React from 'react';

const Instruction3 = ({ onPreviousClick, onNextClick, containerBorder, HrColor }) => {
  return (
    <div className={`relative mt-40 mb-20 ml-5 mr-5 border-2 ${containerBorder}`}>
    <div id="start-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <p className="text-2xl flex items-center justify-center inset-x-0 mt-2">
      Remember, Time is limited.
      <br />
      So be wise...</p>
      <br />
      <hr className={`m-3 ${HrColor}`} />
      <div className="grid grid-cols-2 gap-4 justify-center">
        <p></p>
        <p></p>
        <button id="start-previous" className="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onPreviousClick}>Previous</button>
        <button id="start-next" className="bg-green-500 text-white text-center px-3 py-2 rounded" onClick={onNextClick}>Start</button>
      </div>
    </div>
    </div>
  );
};

export default Instruction3;
