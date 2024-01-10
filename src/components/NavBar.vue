<template>
  <div class="navbar-container">
    <div class="navbar-wrapper">
      <div class="navbar-brand font-title">FAST QA</div>
      <div class="navbar-action-wrapper">
        <div v-if="userName" class="navbar-text">{{ userName }}</div>
        <div v-if="isHomePage" class="navbar-button" @click="backToHome">
          Home
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      userName: 'question/userName',
    }),
    isHomePage() {
      return this.$route.name !== 'home';
    },
  },
  methods: {
    backToHome() {
      this.$store.commit('question/setUserName', '');
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.navbar {
  &-container {
    background-color: #fff;
    color: black;
  }

  &-wrapper {
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    margin: 0 auto;
  }

  &-action-wrapper {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    column-gap: 1rem;
  }

  &-button {
    .button(darkred);
  }

  &-text {
    font-weight: bold;
  }
}
</style>