import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Result from './Result';

describe('Result', () => {
  let testItem = null;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const questionStore = {
      namespaced: true,
      state: {},
      getters: {
        totalScore: () => 0,
        questionList: () => [],
        isLoading: () => false
      },
      mutations: {
        setTotalScore: jest.fn()
      },
      actions: {
        getQuestions: jest.fn(() => true)
      }
    };

    testItem = shallowMount(Result, {
      localVue,
      store: new Vuex.Store({
        modules: { question: questionStore }
      }),
      mocks: { $router: { push: jest.fn() } }
    }).vm;

    testItem.$store.commit = jest.fn();
    testItem.$store.dispatch = jest.fn().mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tryAgain', () => {
    it('should set totalScore to 0 when getQuestions succeeded', async () => {
      await testItem.tryAgain();
      expect(testItem.$store.dispatch).toHaveBeenCalledTimes(1);
      expect(testItem.$store.commit).toHaveBeenCalledTimes(1);
      expect(testItem.$store.commit).toHaveBeenCalledWith('question/setTotalScore', 0);
      expect(testItem.$router.push).toHaveBeenCalledTimes(1);
    });

    it('should not set totalScore when getQuestions failed', async () => {
      testItem.$store.dispatch = jest.fn().mockResolvedValue(false);
      await testItem.tryAgain();
      expect(testItem.$store.dispatch).toHaveBeenCalledTimes(1);
      expect(testItem.$store.commit).toHaveBeenCalledTimes(0);
      expect(testItem.$store.commit).not.toHaveBeenCalledWith('question/setTotalScore', 0);
      expect(testItem.$router.push).toHaveBeenCalledTimes(0);
    });
  });
});
