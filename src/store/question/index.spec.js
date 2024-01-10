import appApi from '@/api/axios';
import store from './index';

describe('actions', () => {
  let results = null;

  describe('getQuestions', () => {
    const commit = jest.fn();
    const getters = jest.fn(() => ({
      startingCategories: {
        amount: 0,
        difficulty: '',
        type: ''
      }
    }));
    results = [
      {
        type: 'boolean',
        category: 'music',
        difficulty: 'easy',
        incorrect_answers: [],
        correct_answer: '',
        question: 'question 1'
      }
    ];

    beforeEach(() => {
      jest.mock('axios', () => ({
        create: jest.fn(),
        get: jest.fn()
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should get options of true and false for each question when type is boolean', async () => {
      const expectBooleanQuestionList = getExpectedQuestionList(results[0], ['True', 'False']);
      const payload = {
        categories: {
          amount: 10,
          difficulty: 'hard',
          type: 'boolean'
        },
        userName: 'test'
      };

      appApi.get = jest.fn(() => Promise.resolve({ data: { results } }));
      const response = await store.actions.getQuestions({ commit, getters }, payload);

      expect(appApi.get).toHaveBeenCalledTimes(1);
      expect(commit).toHaveBeenCalledWith('setUserName', payload.userName);
      expect(commit).toHaveBeenCalledWith('setStartingCategories', payload.categories);
      setQuestionListShouldBeCalled(response, expectBooleanQuestionList);
      setIsLoadingShouldBeCalled();
    });

    it('should get multiple options for each question when type is multiple', async () => {
      results = [
        {
          ...results[0],
          type: 'multiple',
          incorrect_answers: ['1', '2', '3'],
          correct_answer: '4'
        }
      ];
      const expectMultipleQuestionList = getExpectedQuestionList(results[0], ['1', '2', '3', '4']);

      appApi.get = jest.fn(() => Promise.resolve({ data: { results } }));
      const response = await store.actions.getQuestions({ commit, getters });

      expect(appApi.get).toHaveBeenCalledTimes(1);
      expect(commit).not.toHaveBeenCalledWith('setUserName');
      expect(commit).not.toHaveBeenCalledWith('setStartingCategories');
      setQuestionListShouldBeCalled(response, expectMultipleQuestionList);
      setIsLoadingShouldBeCalled();
    });

    it('should not get options when getQuestions failed', async () => {
      appApi.get = jest.fn(() => Promise.reject(new Error('error message')));

      const response = await store.actions.getQuestions({ commit, getters });

      expect(appApi.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(false);
      expect(commit).not.toHaveBeenCalledWith('setUserName');
      expect(commit).not.toHaveBeenCalledWith('setStartingCategories');
      expect(commit).not.toHaveBeenCalledWith('setQuestionList');
      setIsLoadingShouldBeCalled();
    });

    function getExpectedQuestionList(question, options) {
      return [
        {
          ...question,
          isAnswered: false,
          replyAnswer: '',
          options
        }
      ];
    }

    function setQuestionListShouldBeCalled(response, questionList) {
      expect(response).toBe(true);
      expect(commit).toHaveBeenCalledWith('setQuestionList', questionList);
    }

    function setIsLoadingShouldBeCalled() {
      expect(commit).toHaveBeenCalledWith('setIsLoading', true);
      expect(commit).toHaveBeenCalledWith('setIsLoading', false);
    }
  });
});
