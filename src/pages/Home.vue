<template>
  <div class="home-container">
    <div class="home-title">WELCOME</div>
    <div class="home-category-container">
      <div class="home-category-items">
        <div
          class="home-category-item"
          v-for="(categoryItem, categoryIndex) in CATEGORY_ITEMS"
          :key="categoryIndex"
        >
          <div class="home-category-item-title font-subtitle">
            {{ categoryItem.title }}
          </div>
          <div class="home-category-options">
            <Option
              v-model="categories[categoryItem.type]"
              v-for="(option, optionIndex) in categoryItem.options"
              :key="optionIndex"
              :option-name="categoryItem.title"
              :option-label="option.label"
              :option-value="option.value"
              :label-style="['default']"
            />
          </div>
        </div>
        <div class="home-category-item">
          <div class="home-category-item-title font-subtitle">Name</div>
          <input
            v-model="userName"
            type="text"
            class="home-category-input font-subtitle"
            id="userName"
          />
          <label for="userName" class="home-category-input-label text-center" />
        </div>
      </div>
      <div
        class="home-category-button text-center"
        :class="{ disabled: isDisabled }"
        @click="startHandler"
      >
        <LoadingSpinner v-if="isLoading" />
        <span>Start</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CONSTANT from '@/constants/constant';
import LoadingSpinner from '@/components/LoadingSpinner';
import Option from '@/components/Option';

export default {
  name: 'Home',
  components: {
    LoadingSpinner,
    Option,
  },
  data() {
    return {
      categories: {
        type: '',
        difficulty: '',
        amount: '',
      },
      userName: '',
    };
  },
  computed: {
    ...mapGetters({
      isLoading: 'question/isLoading',
    }),
    isDisabled() {
      return (
        this.categories.amount === '' ||
        this.categories.difficulty === '' ||
        this.categories.type === '' ||
        this.userName === ''
      );
    },
  },
  methods: {
    ...mapActions({
      getQuestions: 'question/getQuestions',
    }),
    async startHandler() {
      if (this.isDisabled) {
        return;
      }
      const isSuccess = await this.getQuestions({
        categories: this.categories,
        userName: this.userName,
      });
      if (!isSuccess) {
        return;
      }
      this.$router.push({
        name: 'question',
        params: { questionNumber: 1 },
      });
    },
  },
  created() {
    this.CATEGORY_ITEMS = CONSTANT.CATEGORY_ITEMS;
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.home {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding-top: 3rem;
  }

  &-title {
    font-size: 2rem;
    font-weight: bolder;
  }
}

.home-category {
  &-container {
    width: 100%;
    display: grid;
    align-items: center;
    row-gap: 2rem;
    padding: 0 1.5rem 1.5rem 1.5rem;
  }

  &-items {
    display: grid;
    row-gap: 1.5rem;
  }

  &-item {
    display: flex;
    align-items: center;

    &-title {
      width: 80%;
    }
  }

  &-options {
    width: 100%;
    display: grid;
    row-gap: 10px;
  }

  &-option {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &-label {
    .button-outline(gray);
    width: 100%;
  }

  &-radio {
    &:checked + .home-category-label {
      background-color: darkgray;
    }
  }

  &-input {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    outline: transparent;
    background-color: white;
  }

  &-button {
    .button(darkgray);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}

@media screen and (min-width: 576px) {
  .home-category {
    &-options {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
