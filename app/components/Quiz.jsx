import React, { useState, useEffect } from 'react';
import EndQuizContainer from './EndQuiz';  
import { getQuestionData } from '@/apiClient';

const QuizComponent = ({ selectedQuizType, startSeconds, containerBorder, HrColor, onPreviousClick, selectedDifficulty, backToStart, quizStartDate }) => {
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
    const fetchQuestions = async () => {
      try {
        const questionsData = await getQuestionData(selectedQuizType, quizStartDate);
        setQuestions(shuffleArray([...questionsData]));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    if (selectedQuizType && quizStartDate) {
      fetchQuestions();
    }
  }, [selectedQuizType, quizStartDate]);  

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
  className={`text-green-500 text-3xl float-right mr-5 pb-1 ${showPlus ? 'opacity-100' : 'opacity-0'}`}
>
  +3
</div>
<div
  id="red-minus"
  className={`text-red-500 text-3xl float-left ml-5 pb-1 ${showMinus ? 'opacity-100' : 'opacity-0'}`}
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
      <EndQuizContainer selectedQuizType={selectedQuizType} selectedDifficulty={selectedDifficulty} containerBorder={containerBorder} HrColor={HrColor} finalTime={totalTime} finalScore={finalCount}  quizStartDate={quizStartDate} />
      <div className='flex flex-col'><button id="end-next" className="bg-pink-500 text-white text-center px-3 py-2 rounded m-2" onClick={onPreviousClick}>
          Back to Start
        </button>
        <button id="end-quiz-type" className="bg-black/10 border-2 border-pink-500/50 rounded text-white text-center px-3 py-2 rounded m-2" onClick={backToStart}>
          Change Quiz Type
        </button>
        </div>
        </div>
        </div>
        )}
      </>
    )}
    
export default QuizComponent;
