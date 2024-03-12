"use client";

import React, { useState, useRef, useEffect } from 'react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AudioButtons from "./components/AudioButtons";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";
import Instruction1 from "./components/Instruction1";
import Instruction2 from './components/Instruction2';
import Start from './components/Start';
import QuizTypeButtons from './components/QuizType';
import Leaderboard from './components/Leaderboard';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [quizStartDate, setQuizStartDate] = useState('');
  const [containerBorder, setContainerBorder] = useState(''); 
  const [currentInstruction, setCurrentInstruction] = useState(1);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [hasAudioPlayed, setHasAudioPlayed] = useState(false);
  const [showAudioButtons, setShowAudioButtons] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Normal');
  const [startSeconds, setStartSeconds] = useState('');
  const [HrColor, setHrColor] = useState('');
  const audioPlayerRef = useRef();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    });
      return () => clearTimeout(loadingTimeout);
    }, []);

    if (isLoading) {
      return (
        <div className='w-screen h-screen bg-black flex justify-center items-center'>
          <img className='h-40 w-40 motion-safe:animate-pulse' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
        </div>
      );
    }

  const handleQuizTypeChange = (newQuizType, newContainerBorder, newQuizStartDate, ) => {
    setSelectedQuizType(newQuizType);
    setContainerBorder(newContainerBorder);
    setQuizStartDate(newQuizStartDate);

    if (newQuizStartDate) {
      setQuizStartDate(newQuizStartDate);
    }
  };

  const handleQuestionsLoad = (loadedQuestions) => {
    setQuestions(loadedQuestions);
  };

  const handleNextButtonClick = () => {
    setCurrentInstruction(currentInstruction + 1);
  };

  const handlePreviousClick = () => {
    setCurrentInstruction(currentInstruction - 1);
  };

  const backToStart = () => {
    setCurrentInstruction(1);
  };

  const handleWelcomeFinish = (difficulty, seconds, HrColor, newQuizStartDate ) => {
    if (!hasAudioPlayed) {
      setShowAudioButtons(true);
      setIsAudioOn(true);

      const audioPlayer = audioPlayerRef.current;
      audioPlayer.play();

      setHasAudioPlayed(true);
    }

    handleNextButtonClick();

    setSelectedDifficulty(difficulty);
    setStartSeconds(seconds);
    setHrColor(HrColor);
    
    if (newQuizStartDate) {
      setQuizStartDate(newQuizStartDate);
    }
  };

  const toggleAudio = () => {
    const audioPlayer = audioPlayerRef.current;

    if (isAudioOn) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }

    setIsAudioOn(!isAudioOn);
  };

  return (
    <main className="bg-black font-mono flex flex-col items-center">
      <Navbar />

      <h1 className="text-3xl md:text-5xl font-bold fixed text-white/60 text-center mt-5">TIMEWISE</h1>
      {currentInstruction === 1 && <QuizTypeButtons onQuizTypeChange={handleQuizTypeChange} />}
    {currentInstruction === 1 && <Welcome quizType={selectedQuizType} containerBorder={containerBorder} onNextClick={handleNextButtonClick} onWelcomeFinish={handleWelcomeFinish} />}
    {currentInstruction === 2 && <Instruction1 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} startSeconds={startSeconds} HrColor={HrColor} />}
    {currentInstruction === 3 && <Instruction2 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} />}
    {currentInstruction === 4 && <Start onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} HrColor={HrColor} />}
    {currentInstruction === 5 && <Quiz startSeconds={startSeconds} selectedQuizType={selectedQuizType} onQuestionsLoad={handleQuestionsLoad}  containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} onPreviousClick={handlePreviousClick} backToStart={backToStart} quizStartDate={quizStartDate} />}

<Leaderboard containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} selectedQuizType={selectedQuizType}
        quizStartDate={quizStartDate} />

    {showAudioButtons && <AudioButtons isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}
      <audio ref={audioPlayerRef} src="audio/inspiring-cinematic-ambient-116199.mp3" />
      
      <Footer />
    </main>
  );
}