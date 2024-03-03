"use client";

import React, { useState, useRef } from 'react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AudioButtons from "./components/AudioButtons";
import QuizComponent from "./components/QuizContainer";
import Welcome from "./components/Welcome";
import Instruction1 from "./components/Instruction1";

export default function Home() {
  const [currentInstruction, setCurrentInstruction] = useState(1);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showAudioButtons, setShowAudioButtons] = useState(false);
  const audioPlayerRef = useRef();

  const handleNextButtonClick = () => {
    setCurrentInstruction(currentInstruction + 1);
  };

  const handlePreviousClick = () => {
    setCurrentInstruction(currentInstruction - 1);
  };

  const handleWelcomeFinish = () => {
    setShowAudioButtons(true);
    setIsAudioOn(true);

    // Start playing the music
    const audioPlayer = audioPlayerRef.current;
    audioPlayer.play();

    // Move to the next instruction
    handleNextButtonClick();
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
    <main className="bg-black font-mono flex justify-center">
           
<Navbar />

{showAudioButtons && <AudioButtons isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}
      
<audio ref={audioPlayerRef} src="audio/inspiring-cinematic-ambient-116199.mp3" />

      <h1 className="text-3xl md:text-5xl font-bold fixed text-white/60 text-center mt-5">TIMEWISE</h1>

      {currentInstruction === 1 && <Welcome onNextClick={handleNextButtonClick}  onWelcomeFinish={handleWelcomeFinish} />}
      {currentInstruction === 2 && <Instruction1 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} />}
      {currentInstruction === 5 && <QuizComponent />}
      
      

      <Footer />
    </main>
    
  );
}
