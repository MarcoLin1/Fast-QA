<template>
  <div class="question-page">
    <div class="question-card-container">
      <div class="question-card-content font-title text-center">
        {{ questionList[questionIndex].question }}
      </div>
      <div class="question-card-options">
        <Option
          v-model="currentOption"
          v-for="option in questionList[questionIndex].options"
          :key="`${questionList[questionIndex].question + option}`"
          :option-name="questionList[questionIndex].question"
          :option-label="option"
          :option-value="option"
          :label-style="[
            isMultiple ? 'label-multiple' : `label-${option.toLowerCase()}`,
            {
              answered: questionList[questionIndex].replyAnswer === option,
              disabled: questionList[questionIndex].isAnswered,
            },
          ]"
        />
      </div>
      <div class="question-card-buttons">
        <div
          class="question-card-button text-center"
          @click="changeQuestionNumber(-1)"
        >
          Prev
        </div>
        <div
          v-if="isCompleted"
          class="question-card-button text-center"
          @click="goToResult"
        >
          Result
        </div>
        <div
          v-else
          class="question-card-button text-center"
          :class="{ disabled: currentOption === '' }"
          @click="submitHandler"
        >
          Submit
        </div>
        <div
          class="question-card-button text-center"
          @click="changeQuestionNumber(1)"
        >
          Next
        </div>
      </div>
    </div>
    <div v-if="questionList.length > 0" class="text-center">
      {{ questionIndex + 1 }} / {{ questionList.length }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Option from '@/components/Option';

export default {
  name: 'Question',
  components: {
    Option,
  },
  data() {
    return {
      questionIndex: 0,
      currentOption: '',
    };
  },
  computed: {
    ...mapGetters({
      questionList: 'question/questionList',
      totalScore: 'question/totalScore',
    }),
    isCompleted() {
      return this.questionList.every((question) => question.isAnswered);
    },
    isMultiple() {
      return this.questionList[this.questionIndex].type === 'multiple';
    },
  },
  methods: {
    ...mapMutations({
      setTotalScore: 'question/setTotalScore',
      setAnswered: 'question/setAnswered',
    }),
    changeQuestionNumber(number) {
      this.questionIndex += number;
      if (this.questionIndex < 0) {
        this.questionIndex = 0;
        return;
      }

      if (this.questionIndex >= this.questionList.length) {
        this.questionIndex = this.questionList.length - 1;
        return;
      }

      this.$router.push({
        name: 'question',
        params: { questionNumber: this.questionIndex + 1 },
      });
    },
    submitHandler() {
      if (
        this.currentOption ===
        this.questionList[this.questionIndex].correct_answer
      ) {
        const questionScore = Math.floor(100 / this.questionList.length);
        this.setTotalScore(this.totalScore + questionScore);
      }
      this.setAnswered({
        index: this.questionIndex,
        isAnswered: true,
        replyAnswer: this.currentOption,
      });
      this.changeQuestionNumber(1);
    },
    goToResult() {
      this.$router.push({ name: 'result' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.question-page {
  padding: 3rem 1.5rem 0 1.5rem;
}

.question-card {
  &-container {
    display: grid;
    row-gap: 2rem;
    outline: 1px solid white;
    padding: 1.5rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
  }

  &-options {
    width: 100%;
    display: grid;
    row-gap: 1rem;
  }

  &-label,
  &-button {
    .button-outline(gray);
    width: 100%;

    &:hover {
      outline-color: white;
    }
  }

  &-buttons {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, auto);
    column-gap: 1rem;
  }
}

@media screen and (min-width: 576px) {
  .question-card {
    &-options {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
    }
  }
}
</style>