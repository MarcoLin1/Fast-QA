import appApi from '@/api/axios';

const question = {
  namespaced: true,
  state: {
    startingCategories: {
      amount: 0,
      difficulty: '',
      type: ''
    },
    userName: '',
    questionList: [],
    totalScore: 0,
    isLoading: false
  },
  getters: {
    startingCategories(state) {
      return state.startingCategories;
    },
    userName(state) {
      return state.userName;
    },
    questionList(state) {
      return state.questionList;
    },
    totalScore(state) {
      return state.totalScore;
    },
    isLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    setStartingCategories(state, categories) {
      state.startingCategories = categories;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setQuestionList(state, questionList) {
      state.questionList = questionList;
    },
    setTotalScore(state, totalScore) {
      state.totalScore = totalScore;
    },
    setAnswered(state, questionInfo) {
      const { index, isAnswered, replyAnswer } = questionInfo;
      state.questionList[index].isAnswered = isAnswered;
      state.questionList[index].replyAnswer = replyAnswer;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    async getQuestions({ commit, getters }, payload) {
      try {
        commit('setIsLoading', true);
        const { data } = await appApi.get('/', {
          params: payload?.categories ?? getters.startingCategories
        });
        const questionList = data.results.map((result) => {
          const incorrectAnswers = result.incorrect_answers;
          const correctAnswer = result.correct_answer;
          const options =
            result.type === 'multiple'
              ? [...incorrectAnswers, correctAnswer]
              : ['True', 'False'];
          return {
            ...result,
            question: result.question.replace(/&#(\d+);|&([a-zA-Z]+);/g, ''),
            options,
            isAnswered: false,
            replyAnswer: ''
          };
        });
        commit('setQuestionList', questionList);
        if (payload) {
          commit('setUserName', payload.userName);
          commit('setStartingCategories', payload.categories);
        }
        return true;
      } catch (error) {
        commit('error/setErrorMessage', error.message, { root: true });
        return false;
      } finally {
        commit('setIsLoading', false);
      }
    }
  }
};

export default question;
