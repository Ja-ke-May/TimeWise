import React from 'react';

const EndQuizContainer = ({ finalScore, finalTime, HrColor, containerBorder, selectedQuizType }) => {
  const isOutOfTime = finalTime === 0;

  return (
    <section id="end-container" className="relative p-2 bg-opacity-0 rounded mx-auto text-center text-white md:max-w-2xl">
      {isOutOfTime ? (
        <>
          <p id="end-message" className="text-3xl flex items-center justify-center inset-x-0">
            Out of Time!
          </p>
          <hr className={`m-3 ${HrColor}`} />
          <p className='text-2xl'>Your Score: {finalScore}</p>
        </>
      ) : (
  <>
          <p id="end-message" className="text-3xl flex items-center justify-center inset-x-0">
            Congratulations!
          </p>
          <hr className={`m-3 ${HrColor}`} />
          <p id="end-message1" className="flex items-center justify-center mb-5 text-2xl mt-5">
            You've Completed all 33 questions in the {selectedQuizType.replace(/([a-z])([A-Z])/g, '$1 $2')} Quiz!
          </p>
          <div className="flex flex-col items-center justify-center">
            <p className="m-2 text-2xl">Your Score: {finalScore}</p>
            <p id="secs" className="m-2 text-2xl">Your Time: {finalTime} seconds</p>
          </div>
        </>
      )}
    </section>
  );
};

export default EndQuizContainer;
