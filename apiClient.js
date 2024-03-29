import axios from "axios";

const baseURL = "https://timewise-backend.onrender.com";

const createApiClient = () => {
  return axios.create({
    baseURL: baseURL,
  });
};

export const postLeaderboardData = (data) => {
  const apiClient = createApiClient();
  return apiClient.post('/leaderboard', data);
};

export const getLeaderboardData = async (quizType, quizDate, dateQuizTaken) => {
  try {
    const apiClient = createApiClient();

    const dailyResponse = await apiClient.get('/leaderboard', {
      params: {
        quizType: quizType,
        dateQuizTaken: dateQuizTaken,
      },
    });
    const dailyData = dailyResponse.data;

   
    const weeklyResponse = await apiClient.get('/leaderboard', {
      params: {
        quizType: quizType,
        quizDate: quizDate,
      },
    });
    const weeklyData = weeklyResponse.data;

    const allTimeResponse = await apiClient.get('/leaderboard', {
      params: {
        quizType: quizType,
      },
    });
    const allTimeData = allTimeResponse.data;

    return {
      daily: dailyData,
      weekly: weeklyData,
      allTime: allTimeData,
    };
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};


export const postQuestionData = (data) => {
  const apiClient = createApiClient();
  return apiClient.post('/questions', data);
};

export const getQuestionData = async (quizType, quizDate) => {
  try {
    const apiClient = createApiClient();
    const response = await apiClient.get('/questions', {
      params: {
        quizType: quizType,
        quizDate: quizDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching question data:', error);
    throw error;
  }
};
