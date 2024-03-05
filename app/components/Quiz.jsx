import React, { useState, useEffect } from 'react';
import { generalKnowledgeQuestions } from './GeneralKnowledgeQuestions';
import { musicQuestions } from './MusicQuestions';
import { sportQuestions } from './SportQuestions';

const QuizComponent = ({ startSeconds, selectedQuizType,  }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionContent, setQuestionContent] = useState('');
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timerDuration, setTimerDuration] = useState(startSeconds || 22);
  const [greenPlusVisible, setGreenPlusVisible] = useState(false);
  const [redMinusVisible, setRedMinusVisible] = useState(false);
  const [timerClass, setTimerClass] = useState('');
  const [timerContent, setTimerContent] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    let selectedQuestions = [];

    if (selectedQuizType && (selectedQuizType === 'GeneralKnowledge' || selectedQuizType === 'Music' || selectedQuizType === 'Sport')) {
      if (selectedQuizType === 'GeneralKnowledge') {
        selectedQuestions = generalKnowledgeQuestions;
      } else if (selectedQuizType === 'Music') {
        selectedQuestions = musicQuestions;
      } else if (selectedQuizType === 'Sport') {
        selectedQuestions = sportQuestions;
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
      startTimer(); // Start the timer when questions are loaded
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (timerDuration <= 0) {
      clearInterval(timer);
      // Handle logic when time is up
    }
  }, [timerDuration]);

  const loadQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion) {
      setQuestionContent(currentQuestion.question);
      setAnswerOptions(shuffleArray([...currentQuestion.options]));
    } else {
      console.error('Current question is undefined or null');
    }
  };

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
      setCount(count + 1);
      setTimerDuration((prevDuration) => prevDuration + 3);
      setGreenPlusVisible(true);
      setTimeout(() => {
        setGreenPlusVisible(false);
      }, 500);
    } else {
      setTimerDuration((prevDuration) => prevDuration - 5);
      setRedMinusVisible(true);
      setTimeout(() => {
        setRedMinusVisible(false);
      }, 500);
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const updateTimer = () => {
    setTimerDuration((prevDuration) => {
      const minutes = Math.floor(prevDuration / 60);
      const seconds = prevDuration % 60;
      const content = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setTimerContent(content);
      updateTimerColor();
      return prevDuration;
    });
  };  

  const startTimer = () => {
    setTimer(setInterval(() => {
      setTimerDuration((prevDuration) => prevDuration - 1);
      updateTimer();
    }, 1000));
  };

  const resetTimer = () => {
    clearInterval(timer);
    setTimerDuration(startSeconds || 22);
    updateTimer();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCount(0);
    shuffleArray(questions);
    loadQuestion();
    resetTimer();
  };

  const updateTimerColor = () => {
    setTimerClass(timerDuration <= 5 && timerDuration >= 0 ? 'text-red-500 brightness-125' : '');
  };

  return (
    <div className="relative mt-60 mb-40 ml-5 mr-5">
      <section id="quiz-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div id="green-plus" className={`hidden text-green-500 text-3xl float-right mr-10 pb-1 ${greenPlusVisible && 'block'}`}>+3</div>
        <div id="red-minus" className={`hidden text-red-500 text-3xl float-left ml-10 pb-1 ${redMinusVisible && 'block'}`}>-5</div>
        <div id="timer" className={`text-2xl flex items-center justify-center absolute inset-x-0 ${timerClass}`}>
          {timerContent}
        </div>
        <br />
        <hr className="border-pink-500 m-3" />
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
  );
};

export default QuizComponent;
