import Vuex from 'vuex';
import Home from '@/pages/Home';
import { createLocalVue, shallowMount } from '@vue/test-utils';

describe('Home', () => {
  const categoriesWithValue = {
    type: 'boolean',
    amount: 10,
    difficulty: 'easy'
  };
  const categoriesWithoutValue = {
    type: '',
    amount: '',
    difficulty: ''
  };
  let testItem = null;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const questionStore = {
      namespaced: true,
      getters: {
        isLoading: () => false,
        questionList: () => []
      },
      actions: { getQuestions: jest.fn() }
    };

    testItem = shallowMount(Home, {
      localVue,
      store: new Vuex.Store({
        modules: { question: questionStore }
      }),
      mocks: { $router: { push: jest.fn() } }
    }).vm;

    testItem.$store.dispatch = jest.fn().mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startHandler', () => {
    it('should call getQuestions when categories and userName are completed', async () => {
      testItem.$data.categories = categoriesWithValue;
      testItem.$data.userName = 'testUser';

      await testItem.startHandler();

      getQuestionsShouldBeCalled();
      questionPageShouldBeChanged();
    });

    it('should not call getQuestions when categories and userName are empty', async () => {
      testItem.$data.categories = categoriesWithoutValue;
      testItem.$data.userName = '';

      await testItem.startHandler();

      getQuestionsShouldNeverBeCalled();
      questionPageShouldNeverBeChanged();
    });

    it('should not call getQuestions when categories or userName is empty', async () => {
      testItem.$data.categories = categoriesWithValue;
      testItem.$data.userName = '';
      await testItem.startHandler();
      getQuestionsShouldNeverBeCalled();
      questionPageShouldNeverBeChanged();

      testItem.$data.categories = categoriesWithoutValue;
      testItem.$data.userName = 'testUser';
      await testItem.startHandler();
      getQuestionsShouldNeverBeCalled();
      questionPageShouldNeverBeChanged();
    });

    it('should not call router push when getQuestions failed', async () => {
      testItem.$data.categories = categoriesWithValue;
      testItem.$data.userName = 'testUser';
      testItem.$store.dispatch = jest.fn().mockResolvedValue(false);

      await testItem.startHandler();

      getQuestionsShouldBeCalled();
      questionPageShouldNeverBeChanged();
    });
  });

  describe('isDisabled', () => {
    it('should return true when categories or userName is empty', () => {
      testItem.$data.categories = categoriesWithoutValue;
      testItem.$data.userName = '';
      expect(testItem.isDisabled).toBe(true);

      testItem.$data.categories = categoriesWithoutValue;
      testItem.$data.userName = 'testUser';
      expect(testItem.isDisabled).toBe(true);

      testItem.$data.categories = categoriesWithValue;
      testItem.$data.userName = '';
      expect(testItem.isDisabled).toBe(true);
    });

    it('should return false when categories and userName are not empty', () => {
      testItem.$data.categories = categoriesWithValue;
      testItem.$data.userName = 'testUser';
      expect(testItem.isDisabled).toBe(false);
    });
  });

  function getQuestionsShouldBeCalled() {
    expect(testItem.$store.dispatch).toHaveBeenCalledTimes(1);
    expect(testItem.$store.dispatch).toHaveBeenCalledWith(
      'question/getQuestions',
      {
        categories: categoriesWithValue,
        userName: 'testUser'
      }
    );
  }

  function getQuestionsShouldNeverBeCalled() {
    expect(testItem.$store.dispatch).toHaveBeenCalledTimes(0);
    expect(testItem.$store.dispatch).not.toHaveBeenCalledWith(
      'question/getQuestions',
      {
        categories: categoriesWithValue,
        userName: 'testUser'
      }
    );
  }

  function questionPageShouldBeChanged() {
    expect(testItem.$router.push).toHaveBeenCalledTimes(1);
    expect(testItem.$router.push).toHaveBeenCalledWith({
      name: 'question',
      params: {
        questionNumber: 1
      }
    });
  }

  function questionPageShouldNeverBeChanged() {
    expect(testItem.$router.push).toHaveBeenCalledTimes(0);
    expect(testItem.$router.push).not.toHaveBeenCalledWith({
      name: 'question',
      params: {
        questionNumber: 1
      }
    });
  }
});
