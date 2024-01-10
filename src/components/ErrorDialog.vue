<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay">
      <div class="modal-container" :style="{ maxWidth: `${maxWidth}px` }">
        <div class="modal-header">
          <slot name="header">Here is something wrong...</slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            {{ errorMessage }}, please wait a minute and try again
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div class="modal-button text-center" @click="closeDialog">
              Close
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ErrorDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit('error/setErrorMessage', '');
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.modal {
  &-overlay {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
  }

  &-container {
    width: 100%;
    margin: auto;
    padding: 20px 30px;
    background-color: #282828;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &-header {
    margin-top: 0;
    font-size: 2rem;
    font-weight: bold;
  }

  &-body {
    margin: 20px 0;
  }

  &-button {
    .button(gray);
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
</style>