import { useState, useEffect } from 'react';
import { postLeaderboardData, getLeaderboardData } from "@/apiClient";

const LeaderboardNameEntry = ({ totalScore, selectedQuizType, quizStartDate }) => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboardData(selectedQuizType, quizStartDate);
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
}, [selectedQuizType, quizStartDate, submitted]);

useEffect(() => {
    
    const filteredLeaderboard = leaderboardData.filter(entry =>
      entry.quizType === selectedQuizType && entry.quizDate === quizStartDate
    );

    const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => b.totalScore - a.totalScore || a.userName.localeCompare(b.userName));
    const userIndex = sortedLeaderboard.findIndex(entry => entry.userName === userName && entry.totalScore === totalScore);
    setUserPosition(userIndex + 1);
  }, [userName, totalScore, leaderboardData, selectedQuizType, quizStartDate]);

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
    const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

    const leaderboardData = {
      quizType: selectedQuizType,
      quizDate: quizStartDate,
      dateQuizTaken: formattedDate,
      userName: userName,
      totalScore: totalScore,
    };

    setIsLoading(true);

    try {
      await postLeaderboardData(leaderboardData);
      console.log('Data successfully submitted to the database');
      setSubmitted(true);
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
        <p>Your Leaderboard Position: {userPosition}</p>
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
