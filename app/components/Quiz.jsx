import React, { useState, useEffect } from 'react';
import { generalKnowledgeQuestions } from './questions/GeneralKnowledgeQuestions';
import { musicQuestions } from './questions/MusicQuestions';
import { sportQuestions } from './questions/SportQuestions';
import { geographyQuestions } from './questions/GeographyQuestions';
import { historyQuestions } from './questions/HistoryQuestions';
import { popularCultureQuestions } from './questions/PopularCultureQuestions';
import { scienceQuestions } from './questions/ScienceQuestions';
import EndQuizContainer from './EndQuizContainer';  

const QuizComponent = ({ selectedQuizType, startSeconds, containerBorder, HrColor, onPreviousClick, selectedDifficulty, }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionContent, setQuestionContent] = useState('');
  const [count, setCount] = useState(1);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [showPlus, setShowPlus] = useState(false);
  const [showMinus, setShowMinus] = useState(false);
  const [totalTime, setTotalTime] = useState(startSeconds);
  const [finalCount, setFinalCount] = useState(0);

  useEffect(() => {
    let timerInterval;
  
    const updateTimer = () => {

      if (questions[currentQuestionIndex]) {
        setTotalTime((prevTime) => prevTime - 1);
      }
    };
  
    if (totalTime > 0) {
      timerInterval = setInterval(updateTimer, 1000);
    }
  
    return () => {
      clearInterval(timerInterval);
    };
  }, [totalTime, questions, currentQuestionIndex]);

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
    if (selectedAnswer === correctAnswer) {
      setCount(count + 1);
      setFinalCount((prevCount) => prevCount + 1);

      setTotalTime((prevTime) => prevTime + 3);
      setShowPlus(true);
  
      setTimeout(() => {
        setShowPlus(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 500);
    } else {
      setTotalTime((prevTime) => Math.max(0, prevTime - 5));
      setShowMinus(true);
  
      setTimeout(() => {
        setShowMinus(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 500);      
    }
  };  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    let selectedQuestions = [];

    if (
      selectedQuizType &&
      (selectedQuizType === 'GeneralKnowledge' ||
        selectedQuizType === 'Music' ||
        selectedQuizType === 'Sport' ||
        selectedQuizType === 'Geography' ||
        selectedQuizType === 'History' ||
        selectedQuizType === 'PopularCulture' ||
        selectedQuizType === 'Science')
    ) {
      if (selectedQuizType === 'GeneralKnowledge') {
        selectedQuestions = generalKnowledgeQuestions;
      } else if (selectedQuizType === 'Music') {
        selectedQuestions = musicQuestions;
      } else if (selectedQuizType === 'Sport') {
        selectedQuestions = sportQuestions;
      } else if (selectedQuizType === 'Geography') {
        selectedQuestions = geographyQuestions;
      } else if (selectedQuizType === 'History') {
        selectedQuestions = historyQuestions;
      } else if (selectedQuizType === 'PopularCulture') {
        selectedQuestions = popularCultureQuestions;
      } else if (selectedQuizType === 'Science') {
        selectedQuestions = scienceQuestions;
      }      

      if (selectedQuestions.length > 0) {
        setQuestions(shuffleArray([...selectedQuestions]));
      } else {
        console.error('No questions found for the selected quiz type.');
      }
    } else {
      console.error('Invalid or undefined quiz type.');
    }
  }, [selectedQuizType]);

  useEffect(() => {
    if (questions.length > 0) {
      loadQuestion();
    }
  }, [currentQuestionIndex, questions]);

  const loadQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
      setQuestionContent(currentQuestion.question);
      setAnswerOptions(shuffleArray([...currentQuestion.options]));
    } else {
      console.error('Current question is undefined or null');
    }
  };

  return (
    <>
  {(questions[currentQuestionIndex] && totalTime) ? (
    <div className={`relative mt-40 ml-5 mr-5 border-2 ${containerBorder}`}>
      <section id="quiz-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <div
  id="green-plus"
  className={`text-green-500 text-3xl float-right mr-10 pb-1 ${showPlus ? 'opacity-100' : 'opacity-0'}`}
>
  +3
</div>
<div
  id="red-minus"
  className={`text-red-500 text-3xl float-left ml-10 pb-1 ${showMinus ? 'opacity-100' : 'opacity-0'}`}
>
  -5
</div>
<div
        id="timer"
        className={`text-2xl flex items-center justify-center absolute inset-x-0 ${totalTime <= 5 ? 'text-red-500 brightness-125' : ''}`}
      >
        {totalTime < 10 ? `0${totalTime}` : `${totalTime}`}
      </div>
        <br />
        <hr className={`m-3 ${HrColor}`} />
        <div id="question-box" className="mb-5 text-2xl">
          {questionContent}
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          {answerOptions.map((option, index) => (
            <button key={index} onClick={() => checkAnswer(option)} className="answer-box bg-pink-500 text-white text-center px-3 py-2 rounded">
              {option}
            </button>
          ))}
        </div>
      </section>
      </div>
    ) : (
      <div className={`relative mt-60 mb-20 border-2 ${containerBorder}`}>
      <div className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
      <EndQuizContainer selectedQuizType={selectedQuizType} selectedDifficulty={selectedDifficulty} containerBorder={containerBorder} HrColor={HrColor} finalTime={totalTime} finalScore={finalCount} />
      <button id="end-next" className="bg-pink-500 text-white text-center px-3 py-2 rounded m-2" onClick={onPreviousClick}>
          Back to Start
        </button>
        </div>
        </div>
    )}
  </>
);
    }
export default QuizComponent;
