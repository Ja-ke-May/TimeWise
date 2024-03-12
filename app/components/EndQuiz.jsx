import React, { useState } from 'react';
import LeaderboardNameEntry from './LeaderboardNameEntry';

const EndQuizContainer = ({ finalScore, finalTime, HrColor, selectedQuizType, selectedDifficulty, quizStartDate }) => {

  const isOutOfTime = finalTime === 0;
  let selectedDifficultyPoints = 0;
  let difficultyTextColor = '';

  if (finalScore === 33) {
    if (selectedDifficulty === 'Easy') {
      selectedDifficultyPoints = 10;
      difficultyTextColor = 'text-green-500';
    } else if (selectedDifficulty === 'Normal') {
      selectedDifficultyPoints = 44;
      difficultyTextColor = 'text-pink-500';
    } else if (selectedDifficulty === 'Hard') {
      selectedDifficultyPoints = 88;
      difficultyTextColor = 'text-red-500';
    }
  }

  let totalScore = finalScore + selectedDifficultyPoints + finalTime;

  return (
    <section id="end-container" className="relative p-2 bg-opacity-0 rounded mx-auto text-center text-white md:max-w-2xl">
      {isOutOfTime ? (
        <>
        <p id="end-message" className="text-3xl flex items-center justify-center inset-x-0">
          Out of Time!
        </p>
        <hr className={`m-3 ${HrColor}`} />
        <p className={`text-xl`}>Correct Answers: {finalScore}</p>
        {finalScore === 33 && (
  <p className={`text-xl ${difficultyTextColor}`}>+ {selectedDifficultyPoints}</p>
)}
        <p className={`text-2xl m-5 p-4 rounded border-2 border-pink-500`}>Total Score: {totalScore}</p>
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
            <p className="m-2 text-2xl">Correct Answers: {finalScore}</p>
            {finalScore === 33 && (
  <p className={`text-xl ${difficultyTextColor}`}>+ {selectedDifficultyPoints}</p>
)}
<p id="secs" className="m-2 text-2xl mb-5">Time: {finalTime} seconds</p>
            <p className={`text-2xl mb-5 p-4 rounded border-2 border-pink-500`}>Total Score: {totalScore}</p>
          </div>
        </>
      )}
      <hr className={`m-3 ${HrColor}`} />
      <LeaderboardNameEntry totalScore={totalScore} selectedQuizType={selectedQuizType} quizStartDate={quizStartDate} />
      <hr className={`m-3 ${HrColor}`} />
    </section>
  );
};

export default EndQuizContainer;
