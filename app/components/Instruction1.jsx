import React from 'react';

const Instruction1 = ( {onPreviousClick } ) => {
  return (
    <div className="absolute mt-60 mb-40 ml-5 mr-5 ">
      <section id="welcome-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div className="text-2xl flex items-center justify-center absolute inset-x-0">
        00:22
        </div>
        <br />
        <hr className={`m-3 border-white`} />
        <div className="mb-5 text-2xl">
        Answer multiple-choice questions by clicking or tapping your choice.
                You begin with 22 seconds on the clock.
        </div>
        <div class="grid grid-cols-2 gap-4 justify-center">
                <p></p>
                <p ></p>
                <button id="instruction1-previous" class="bg-pink-500 text-white text-center px-3 py-2 rounded" onClick={onPreviousClick}>Previous</button>
                <button id="instruction1-next" class="bg-pink-500 text-white text-center px-3 py-2 rounded">Next</button>
            </div>
      </section>
    </div>
  );
};

export default Instruction1;
