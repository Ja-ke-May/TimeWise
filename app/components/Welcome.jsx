import React, { useState } from 'react';

const Welcome = ({ onWelcomeFinish, quizType, containerBorder }) => {

  const difficultySettings = {
    Easy: {
      seconds: 44,
      hrColor: 'border-green-500',
    },
    Normal: {
      seconds: 22,
      hrColor: 'border-pink-500',
    },
    Hard: {
      seconds: 5,
      hrColor: 'border-red-500',
    },
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState('Normal');

  // Destructuring the difficulty object to get seconds and HrColor
  const { seconds, hrColor } = difficultySettings[selectedDifficulty];

  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleNextButtonClick = () => {
    onWelcomeFinish(selectedDifficulty, seconds, hrColor);
    console.log(selectedDifficulty, seconds, hrColor);
  };

  const formattedQuizType = quizType.replace(/([a-z])([A-Z])/g, '$1 $2');

  return (
    <div className={`relative mt-20 mb-20 ml-5 mr-5 border-2 ${containerBorder}`}>
      <div id="welcome-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white">
        <div className="text-3xl flex items-center justify-center inset-x-0">
          Welcome to TimeWise
        </div>
        <hr className={`m-3 ${hrColor}`} />
        <div className="mb-5 text-2xl">
          The {formattedQuizType} quiz where every second counts!
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
                ? 'bg-black/10 text-pink-500 border-pink-500'
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
      </div>
    </div>
  );
};

export default Welcome;