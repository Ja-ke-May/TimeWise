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
// import Competition from './components/Competition';
import Menu from './components/Menu';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuizType, setSelectedQuizType] = useState('');
  const [quizStartDate, setQuizStartDate] = useState('');
  const [leaderboardStartDate, setLeaderboardStartDate] = useState('');
  const [leaderboardSelectedQuizType, setLeaderboardSelectedQuizType] = useState('');
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
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-V1R4EPJ038';
    script.async = true;
    document.body.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-V1R4EPJ038');

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    setLeaderboardStartDate(newQuizStartDate);
    setLeaderboardSelectedQuizType(newQuizType);

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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  const scrollToQuiz = () => {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLeaderboard = () => {
    document.getElementById('leaderboard').scrollIntoView({ behavior: 'smooth' });
  };

 

  return (
<>
<header className="font-mono flex flex-col items-center z-50">
<Navbar />
    <h1 className="text-3xl md:text-5xl font-bold fixed text-white/80 text-center mt-5" onClick={scrollToBottom}>TIMEWISE</h1>
</header>
    <main className="bg-black font-mono flex flex-col items-center">
      
      {/* <Competition /> */}
      <section id="quiz">
      {currentInstruction === 1 && <QuizTypeButtons onQuizTypeChange={handleQuizTypeChange} />}
    {currentInstruction === 1 && <Welcome quizType={selectedQuizType} containerBorder={containerBorder} onNextClick={handleNextButtonClick} onWelcomeFinish={handleWelcomeFinish} />}
    {currentInstruction === 2 && <Instruction1 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} startSeconds={startSeconds} HrColor={HrColor} />}
    {currentInstruction === 3 && <Instruction2 onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} />}
    {currentInstruction === 4 && <Start onNextClick={handleNextButtonClick} onPreviousClick={handlePreviousClick} containerBorder={containerBorder} HrColor={HrColor} />}
    {currentInstruction === 5 && <Quiz startSeconds={startSeconds} selectedQuizType={selectedQuizType} onQuestionsLoad={handleQuestionsLoad}  containerBorder={containerBorder} selectedDifficulty={selectedDifficulty} HrColor={HrColor} onPreviousClick={handlePreviousClick} backToStart={backToStart} quizStartDate={quizStartDate} />}
    </section>
    <section id="leaderboard">
<Leaderboard containerBorder={containerBorder} HrColor={HrColor} leaderboardSelectedQuizType={leaderboardSelectedQuizType} setLeaderboardSelectedQuizType={setLeaderboardSelectedQuizType}
         leaderboardStartDate={leaderboardStartDate} setLeaderboardStartDate={setLeaderboardStartDate} />
</section>
    {showAudioButtons && <AudioButtons isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}
      <audio ref={audioPlayerRef} src="audio/inspiring-cinematic-ambient-116199.mp3" loop />
      <Menu 
      scrollToQuiz={scrollToQuiz}
      scrollToLeaderboard={scrollToLeaderboard}
      scrollToBottom={scrollToBottom}
          />
          
         
    
      <Footer />
    </main>
    </>
  );
}