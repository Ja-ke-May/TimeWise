import axios from "axios";

const baseURL = "http://localhost:3001/";

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
