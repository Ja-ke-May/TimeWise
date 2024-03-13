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

export const getLeaderboardData = (quizType, quizDate) => {
  const apiClient = createApiClient();
  const params = {
    params: {
      quizType: quizType,
      quizDate: quizDate,
    },
  };
  return apiClient.get('/leaderboard', params);
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
