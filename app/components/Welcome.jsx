import React, { useState } from 'react';

const Welcome = ({ onWelcomeFinish }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('Normal');

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleNextButtonClick = () => {
    onWelcomeFinish(selectedDifficulty); 
  };

  const getHrColor = () => {
    switch (selectedDifficulty) {
      case 'Easy':
        return 'border-green-500';
      case 'Normal':
        return 'border-pink-500';
      case 'Hard':
        return 'border-red-500';
      default:
        return 'border-white'; 
    }
  };

  return (
    <div className="absolute mt-60 mb-40 ml-5 mr-5 ">
      <section id="welcome-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div className="text-2xl flex items-center justify-center absolute inset-x-0">
          Welcome to TimeWise
        </div>
        <br />
        <hr className={`m-3 ${getHrColor()}`} />
        <div className="mb-5 text-2xl">
          The general knowledge quiz where every second counts!
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <button
            id="EasyMode"
            onClick={() => handleDifficultyClick('Easy')}
            className={`${
              selectedDifficulty === 'Easy'
                ? 'bg-black/10 text-green-500 border-green-500'
                : 'bg-black/50 text-green-500/30 border-green-500/20'
            } text-center px-3 py-2 rounded border-2`}
          >
            Easy
          </button>
          <button
            id="NormalMode"
            onClick={() => handleDifficultyClick('Normal')}
            className={`${
              selectedDifficulty === 'Normal'
                ? 'bg-black/100 text-pink-500 border-pink-500'
                : 'bg-black/50 text-pink-500/30 border-pink-500/20'
            } text-center px-3 py-2 rounded border-2`}
          >
            Normal
          </button>
          <button
            id="HardMode"
            onClick={() => handleDifficultyClick('Hard')}
            className={`${
              selectedDifficulty === 'Hard'
                ? 'bg-black/10 text-red-500 border-red-500'
                : 'bg-black/50 text-red-500/30 border-red-500/20'
            } text-center px-3 py-2 rounded border-2`}
          >
            Hard
          </button>
          <button
            id="welcome-next"
            onClick={() => handleNextButtonClick()}
            className="bg-pink-500 text-white text-center px-3 py-2 rounded"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
