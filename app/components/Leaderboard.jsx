import { useState, useEffect } from 'react';
import { getLeaderboardData } from "@/apiClient";

const Leaderboard = ({ containerBorder, selectedQuizType, quizStartDate, }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);

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

   const intervalId = setInterval(fetchLeaderboard, 2000);

   return () => clearInterval(intervalId);
 }, [selectedQuizType, quizStartDate]);   

    const sortedLeaderboardData = [...leaderboardData].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className={`relative mt-60 mb-40 ml-5 mr-5 border-2 ${containerBorder}`}>
      <div id="Leaderboard-container" className="p-6 bg-black bg-opacity-60 rounded mx-auto text-center text-white md:max-w-2xl">
        <div className={`text-2xl flex items-center justify-center inset-x-0`}>
          <img className='h-10 w-10 mr-3 ml-2' src="images/TimeWiseLogo.png" alt="TimeWise Logo" /> {selectedQuizType.replace(/([a-z])([A-Z])/g, '$1 $2')} Leaderboard <img className='h-10 w-10 mr-2 ml-3' src="images/TimeWiseLogo.png" alt="TimeWise Logo" />
        </div>
        <hr className={`m-3 border-pink-500 rounded-full`} />
        <p className='m-2'>
             Quiz Start Date: <div><span className="ml-2 cursor-pointer">{'<'}</span> {quizStartDate}
          <span className="ml-2 cursor-pointer">{'>'}</span></div>
        </p>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border border-pink-500"></th>
              <th className="border border-pink-500 p-2 text-xs">Name</th>
              <th className="border border-pink-500 text-xs">Score</th>
            </tr>
          </thead>
          <tbody>
  {sortedLeaderboardData.slice(0, 1000).map((entry, index) => (
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
