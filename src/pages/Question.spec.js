import Vuex from 'vuex';
import Question from '@/pages/Question';
import { createLocalVue, shallowMount } from '@vue/test-utils';

describe('Question', () => {
  let testItem = null;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const questionStore = {
      namespaced: true,
      state: {},
      getters: {
        questionList: () => [
          {
            type: 'boolean',
            category: 'music',
            difficulty: 'easy',
            incorrect_answers: ['1'],
            correct_answer: '2',
            question: 'question 1'
          },
          {
            type: 'boolean',
            category: 'music',
            difficulty: 'easy',
            incorrect_answers: ['1'],
            correct_answer: '2',
            question: 'question 2'
          }
        ],
        totalScore: () => 0
      },
      mutations: {
        setTotalScore: jest.fn(),
        setAnswered: jest.fn()
      },
      actions: {}
    };

    const store = new Vuex.Store({
      modules: { question: questionStore }
    });

    testItem = shallowMount(Question, {
      localVue,
      store,
      mocks: {
        $router: { push: jest.fn() }
      }
    }).vm;

    testItem.$store.commit = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('changeQuestionNumber', () => {
    it('should update questionIndex when number between 0 and questionList length', () => {
      testItem.changeQuestionNumber(1);
      expect(testItem.$data.questionIndex).toBe(1);
      expect(testItem.$router.push).toHaveBeenCalledTimes(1);
      expect(testItem.$router.push).toHaveBeenCalledWith({
        name: 'question',
        params: {
          questionNumber: testItem.$data.questionIndex + 1
        }
      });
    });

    it('should assign questionIndex to 0 when number is less than or equal to 0', () => {
      testItem.changeQuestionNumber(-1);
      expect(testItem.$data.questionIndex).toBe(0);
      expect(testItem.$router.push).toHaveBeenCalledTimes(0);
    });

    it('should assign questionIndex to questionList length minus 1 when number is greater than questionList length', () => {
      testItem.changeQuestionNumber(10);
      const { length } = testItem.$store.getters['question/questionList'];
      expect(testItem.$data.questionIndex).toBe(length - 1);
      expect(testItem.$router.push).toHaveBeenCalledTimes(0);
    });
  });

  describe('submitHandler', () => {
    it('should get score when answer is correct', () => {
      testItem.$data.currentOption = '2';
      testItem.$data.questionIndex = 1;

      testItem.submitHandler();

      expect(testItem.$store.commit).toHaveBeenCalledTimes(2);
      expect(testItem.$store.commit).toHaveBeenCalledWith('question/setTotalScore', 50);
      expect(testItem.$store.commit).toHaveBeenCalledWith(
        'question/setAnswered',
        {
          index: 1,
          isAnswered: true,
          replyAnswer: '2'
        }
      );
    });

    it('should not get score when answer is incorrect', () => {
      testItem.$data.currentOption = '10';
      testItem.$data.questionIndex = 1;

      testItem.submitHandler();

      expect(testItem.$store.commit).toHaveBeenCalledTimes(1);
      expect(testItem.$store.commit).not.toHaveBeenCalledWith('question/setTotalScore');
      expect(testItem.$store.commit).toHaveBeenCalledWith(
        'question/setAnswered',
        {
          index: 1,
          isAnswered: true,
          replyAnswer: '10'
        }
      );
    });
  });
});
