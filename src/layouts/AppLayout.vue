<template>
  <div class="layout-container">
    <NavBar />
    <div class="layout-wrapper">
      <router-view />
    </div>
    <ErrorDialog :show="errorMessage !== ''" :error-message="errorMessage" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import ErrorDialog from '@/components/ErrorDialog';
import { mapGetters } from 'vuex';

export default {
  name: 'AppLayout',
  components: {
    NavBar,
    ErrorDialog,
  },
  computed: {
    ...mapGetters({
      errorMessage: 'error/errorMessage',
    }),
  },
};
</script>

<style lang="less" scoped>
.layout {
  &-container {
    min-height: 100vh;
    color: white;
  }

  &-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>