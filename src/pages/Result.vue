<template>
  <div class="result-container">
    <div class="result-title font-title text-center">TOTAL SCORE</div>
    <div class="result-score font-title text-center">{{ totalScore }}</div>
    <div class="result-buttons">
      <div
        class="result-button result-button-again text-center"
        @click="tryAgain"
      >
        <LoadingSpinner v-if="isLoading" />
        <span>Try again</span>
      </div>
      <div
        class="result-button result-button-back text-center"
        @click="backToHome"
      >
        Home
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
  name: 'Result',
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapGetters({
      totalScore: 'question/totalScore',
      isLoading: 'question/isLoading',
    }),
  },
  methods: {
    async tryAgain() {
      const isSuccess = await this.$store.dispatch('question/getQuestions');
      if (!isSuccess) {
        return;
      }
      this.$store.commit('question/setTotalScore', 0);
      this.$router.push({ name: 'question', params: { questionNumber: 1 } });
    },
    backToHome() {
      this.$store.commit('question/setTotalScore', 0);
      this.$store.commit('question/setUserName', '');
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.result {
  &-container {
    display: grid;
    row-gap: 1.5rem;
    padding: 3rem 1.5rem 0 1.5rem;
  }

  &-buttons {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 1rem;
  }

  &-button {
    &-again {
      .button(darkorange);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    &-back {
      .button(darkred);
    }
  }
}
</style>
