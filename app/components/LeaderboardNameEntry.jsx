import { useState, useEffect } from 'react';
import { postLeaderboardData, getLeaderboardData } from "@/apiClient";

const LeaderboardNameEntry = ({ totalScore, selectedQuizType, quizStartDate }) => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [dailyUserPosition, setDailyUserPosition] = useState(null);
  const [allTimeUserPosition, setAllTimeUserPosition] = useState(null);
  const [dateQuizTaken, setdateQuizTaken] = useState('')
  const [refNumber, setRefNumber] = useState(null); 
  const [displayedRefNumber, setDisplayedRefNumber] = useState(null);

  const generateRefNumber = () => {
    return Math.floor(Math.random() * (1000000000 - 1000) + 1000);
  };

  useEffect(() => {
    const currentDate = getCurrentDateInUKFormat();
    setdateQuizTaken(currentDate);
    setRefNumber(generateRefNumber());
  }, []);

  const getCurrentDateInUKFormat = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDateInUKFormat();
    setdateQuizTaken(currentDate);
  }, []);
  

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboardData(selectedQuizType, quizStartDate, dateQuizTaken);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };
  
    fetchLeaderboard();
  }, [selectedQuizType, quizStartDate, dateQuizTaken, submitted]);
  

  const handleInputChange = (e) => {
    const inputText = e.target.value.replace(/[^A-Za-z0-9 ]/g, '').slice(0, 15);
    setUserName(inputText);
  };  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnterClick();
    }
  };

  const handleEnterClick = async () => {
    const currentDate = getCurrentDateInUKFormat();
    setdateQuizTaken(currentDate);

    const newRefNumber = generateRefNumber();
    setRefNumber(newRefNumber);

    const leaderboardData = {
      quizType: selectedQuizType,
      quizDate: quizStartDate,
      dateQuizTaken: currentDate,
      userName: userName,
      totalScore: totalScore,
      refNumber: newRefNumber,
    };
  
    setIsLoading(true);
  
    try {
      await postLeaderboardData(leaderboardData);
      setSubmitted(true);

      setDisplayedRefNumber(newRefNumber);

      const { daily, weekly, allTime } = await getLeaderboardData(selectedQuizType, quizStartDate, dateQuizTaken);

      // All Time leaderboard
      const sortedAllTime = allTime.sort((a, b) => b.totalScore - a.totalScore);
      const userIndexAllTime = sortedAllTime.findIndex(entry => entry.userName === userName && entry.totalScore === totalScore);
      if (userIndexAllTime !== -1) {
        setAllTimeUserPosition(userIndexAllTime + 1);
      } else {
        setAllTimeUserPosition(null); 
      }

      // Daily leaderboard
      const sortedDaily = daily.sort((a, b) => b.totalScore - a.totalScore);
      const userIndexDaily = sortedDaily.findIndex(entry => entry.userName === userName && entry.totalScore === totalScore);
      if (userIndexDaily !== -1) {
        setDailyUserPosition(userIndexDaily + 1); 
      } else {
        setDailyUserPosition(null); 
      }

      // Weekly leaderboard
      const sortedWeekly = weekly.sort((a, b) => b.totalScore - a.totalScore);
      const userIndexWeekly = sortedWeekly.findIndex(entry => entry.userName === userName && entry.totalScore === totalScore);
      if (userIndexWeekly !== -1) {
        setUserPosition(userIndexWeekly + 1); 
      } else {
        setUserPosition(null);
      }
    } catch (error) {
      console.error('Error submitting data to the database:', error);
    } finally {
      setIsLoading(false);
    }
};

  const isButtonDisabled = isLoading || userName.trim() === '' || submitted;

 if (submitted) {
    return (
      <div className='m-2 text-xl text-center justify-center'>
        <p className='text-pink-100'>REF: {displayedRefNumber}</p>
         <p>Daily Leaderboard Position: {dailyUserPosition}</p>
        <p>Weekly Leaderboard Position: {userPosition}</p>
        <p>All Time Leaderboard Position: {allTimeUserPosition}</p>
      </div>
    );
  }

  return (
    <div className='m-2 text-lg text-center justify-center'>
      <label>
        <input
          type="text"
          value={userName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="m-2 p-2 rounded border-2 border-pink-500 text-center text-black text-xl"
          placeholder='Name for Leaderboard'
          maxLength={15}
          pattern="[A-Za-z0-9 ]*"
        />
      </label>
      <button
        onClick={handleEnterClick}
        disabled={isButtonDisabled}
        className="bg-black/10 border-2 border-pink-500/50 rounded text-green-500 text-center px-3 py-2 rounded m-2">
        {isLoading ? 'Submitting...' : 'Enter'}
      </button>
    </div>
  );
};

export default LeaderboardNameEntry;
