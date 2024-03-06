"use client";

import React, { useState, useRef } from 'react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AudioButtons from "./components/AudioButtons";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";
import Instruction1 from "./components/Instruction1";
import Instruction2 from './components/Instruction2';
import Start from './components/Start';
import QuizTypeButtons from './components/QuizType';

export default function Home() {
  const [selectedQuizType, setSelectedQuizType] = useState('GeneralKnowledge');
  const [containerBorder, setContainerBorder] = useState('border-pink-500/0'); 
  const [currentInstruction, setCurrentInstruction] = useState(1);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showAudioButtons, setShowAudioButtons] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Normal');
  const [startSeconds, setStartSeconds] = useState(22);
  const [HrColor, setHrColor] = useState('border-pink-500');
  const audioPlayerRef = useRef();

  const handleQuizTypeChange = (newQuizType, newContainerBorder) => {
    setSelectedQuizType(newQuizType);
    setContainerBorder(newContainerBorder);
  };

  const handleQuestionsLoad = (loadedQuestions) => {
    setQuestions(loadedQuestions);
  };

  const handleNextButtonClick = () => {
    setCurrentInstruction(currentInstruction + 1);
  };

  const handlePreviousClick = () => {
    setCurrentInstruction(currentInstruction - 1);

    if (currentInstruction === 2) {
      setContainerBorder('border-pink-500/0'); 
      setSelectedQuizType('GeneralKnowledge');
    }
  };

  const handleWelcomeFinish = (difficulty, seconds, HrColor) => {
    setShowAudioButtons(true);
    setIsAudioOn(true);

    const audioPlayer = audioPlayerRef.current;
    audioPlayer.play();

    handleNextButtonClick();

    setSelectedDifficulty(difficulty);
    setStartSeconds(seconds);
    setHrColor(HrColor);
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

      {showAudioButtons && <AudioButtons isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}
      <audio ref={audioPlayerRef} src="audio/inspiring-cinematic-ambient-116199.mp3" />
      <h1 className="text-3xl md:text-5xl font-bold fixed text-white/60 text-center mt-5">TIMEWISE</h1>
      {currentInstruction === 1 && <QuizTypeButtons onQuizTypeChange={handleQuizTypeChange} />}
    {currentInstruction === 1 && <Welcome quizType={selectedQuizType} containerBorder={containerBorder} onNextClick={handleNextButtonClick} onWelcomeFinish={handleWelcomeFinish} />}
    {currentInstruction === 2 && <Instruction1 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} startSeconds={startSeconds} HrColor={HrColor} />}
    {currentInstruction === 3 && <Instruction2 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} />}
    {currentInstruction === 4 && <Start onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} HrColor={HrColor} />}
    {currentInstruction === 5 && <Quiz startSeconds={startSeconds} selectedQuizType={selectedQuizType} onQuestionsLoad={handleQuestionsLoad}  containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} onPreviousClick={handlePreviousClick} />}

      <Footer />
    </main>
  );
}