import React from 'react';

const Instruction2 = ({ onPreviousClick, onNextClick, HrColor, containerBorder }) => {
  return (
    <div className={`relative mt-40 mb-20 ml-5 mr-5 border-2 ${containerBorder}`}>
    <div id="instruction2-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <div id="green-plus1" className="text-green-500 text-3xl float-right mr-10 pb-1">+3</div>
      <div id="red-minus1" className="text-red-500 text-3xl float-left ml-10 pb-1">-5</div>
      <div className="text-2xl text-red-500 brightness-125 flex items-center justify-center absolute inset-x-0">
        00:00
      </div>
      <br />
      <hr className={`m-3 ${HrColor}`} />
      <p className="flex items-center justify-center mb-5 text-2xl">
        For each correct answer, gain 3 seconds; for an incorrect one, lose 5 seconds. The quiz ends when time runs out or after 33 questions.
      </p>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <p></p>
        <p></p>
        <button id="instruction2-previous" className="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onPreviousClick}>Previous</button>
        <button id="instruction2-next" className="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onNextClick}>Next</button>
      </div>
    </div>
    </div>
  );
};

export default Instruction2;
