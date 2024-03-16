import { useState, useEffect } from 'react';
import { getLeaderboardData } from "@/apiClient";

const Leaderboard = ({ containerBorder, leaderboardSelectedQuizType, setLeaderboardSelectedQuizType, leaderboardStartDate, setLeaderboardStartDate }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [viewMode, setViewMode] = useState('Weekly');
    const [dynamicBorder, setDynamicBorder] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await getLeaderboardData(leaderboardSelectedQuizType, leaderboardStartDate, viewMode);
                setLeaderboardData(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };
    
        fetchLeaderboard();

   const intervalId = setInterval(fetchLeaderboard, 2000);

   return () => clearInterval(intervalId);
 }, [leaderboardSelectedQuizType, leaderboardStartDate, viewMode]);   

    const sortedLeaderboardData = [...leaderboardData].sort((a, b) => b.totalScore - a.totalScore);

    useEffect(() => {
      const quizTypeBorders = {
          'GeneralKnowledge': 'border-pink-500/0 rounded',
          'Music': 'border-orange-500/50 rounded',
          'Geography': 'border-green-500/50 rounded',
          'Sport': 'border-blue-500/50 rounded',
          'History': 'border-purple-500/50 rounded',
          'PopularCulture': 'border-yellow-500/50 rounded',
          'Science': 'border-teal-500/50 rounded',
      };

      setDynamicBorder(quizTypeBorders[leaderboardSelectedQuizType] || '');
  }, [leaderboardSelectedQuizType]);


    const handleDateChange = (direction) => {
      const dateParts = leaderboardStartDate.split('/'); 
      const day = dateParts[0].padStart(2, '0'); 
      const month = dateParts[1].padStart(2, '0'); 
      const year = 2000 + parseInt(dateParts[2]); 
      
      const currentDate = new Date(`${year}-${month}-${day}`);
  
      if (direction === 'previous') {
          currentDate.setDate(currentDate.getDate() - 7);
      } else if (direction === 'next') {
          currentDate.setDate(currentDate.getDate() + 7);
      }
  
      const today = new Date();
  
      if (currentDate.getTime() > today.getTime()) {
          return;
      }
  
      const newStartDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${String(currentDate.getFullYear()).slice(-2)}`;
      setLeaderboardStartDate(newStartDate);
  };
  
  const toggleViewMode = (direction) => {
    const modes = ['Daily', 'Weekly', 'All Time'];
    const currentIndex = modes.indexOf(viewMode);
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % modes.length;
    } else {
      nextIndex = (currentIndex - 1 + modes.length) % modes.length; 
    }
    
    setViewMode(modes[nextIndex]);
  };
  
  const toggleLeaderboardType = (direction) => {
    const quizTypes = ['GeneralKnowledge', 'Music', 'Geography', 'Sport', 'History', 'PopularCulture', 'Science'];
    const currentIndex = quizTypes.indexOf(leaderboardSelectedQuizType);
    let nextIndex;
  
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % quizTypes.length;
    } else {
      nextIndex = (currentIndex - 1 + quizTypes.length) % quizTypes.length;
    }
  
    const nextQuizType = quizTypes[nextIndex];
  
    const today = new Date();
    let startDate;
  
    if (nextQuizType === 'GeneralKnowledge') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7);
    } else if (nextQuizType === 'Music') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 5) % 7);
    } else if (nextQuizType === 'Geography') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 4) % 7);
    } else if (nextQuizType === 'Sport') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 3) % 7);
    } else if (nextQuizType === 'History') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 2) % 7);
    } else if (nextQuizType === 'PopularCulture') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 1) % 7);
    } else if (nextQuizType === 'Science') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 0) % 7);
    }
  
    const formattedStartDate = `${startDate.getDate().toString().padStart(2, '0')}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${String(startDate.getFullYear()).slice(-2)}`;
  
    setLeaderboardSelectedQuizType(nextQuizType);
    setLeaderboardStartDate(formattedStartDate);
  };
  
  
  return (
    <div className={`relative mt-60 mb-40 ml-5 mr-5 border-2 ${dynamicBorder}`}>
      <div id="Leaderboard-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div className={`text-2xl flex items-center justify-center inset-x-0`}>
          <img className='h-10 w-10 mr-3 ml-2' src="images/TimeWiseLogo.png" alt="TimeWise Logo" /> 
          <span className="mr-2 cursor-pointer" onClick={() => toggleLeaderboardType('previous')}>{'<'}</span>
          {leaderboardSelectedQuizType.replace(/([a-z])([A-Z])/g, '$1 $2')} Leaderboard
          <span className="ml-2 cursor-pointer" onClick={() => toggleLeaderboardType('next')}>{'>'}</span>
           <img className='h-10 w-10 mr-2 ml-3' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
        </div>
        <hr className={`m-3 border-pink-500 rounded-full`} />
        <div>
  <span className="mr-2 cursor-pointer" onClick={() => toggleViewMode('previous')}>{'<'}</span>
  {/* {viewMode} */}Weekly
  <span className="ml-2 cursor-pointer" onClick={() => toggleViewMode('next')}>{'>'}</span>
</div>
        <hr className={`m-3 border-pink-500 rounded-full`} />
        <div className='m-2'>
                    Quiz Start Date: 
                    <div>
                        <span className="ml-2 cursor-pointer" onClick={() => handleDateChange('previous')}>{'<'}</span> {leaderboardStartDate}
                        <span className="ml-2 cursor-pointer" onClick={() => handleDateChange('next')}>{'>'}</span>
                    </div>
                </div>

        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border border-pink-500"></th>
              <th className="border border-pink-500 p-2 text-xs">Name</th>
              <th className="border border-pink-500 text-xs">Score</th>
            </tr>
          </thead>
          <tbody>
  {sortedLeaderboardData.slice(0, 999).map((entry, index) => (
    <tr key={index + 1}>
      <td className="border border-pink-500">{index + 1}</td>
      <td className="border border-pink-500 p-2 text-xl">{entry.userName}</td>
      <td className="border border-pink-500 text-xl">{entry.totalScore}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
