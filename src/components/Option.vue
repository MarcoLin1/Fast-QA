<template>
  <div class="option-item">
    <input
      type="radio"
      class="option-item-radio invisible"
      :name="optionName"
      :id="optionLabel"
      :value="optionValue"
      @input="$emit('input', $event.target.value)"
    />
    <label
      class="option-item-label text-center"
      :for="optionLabel"
      :class="labelStyle"
    >
      {{ optionLabel }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'Option',
  props: {
    optionName: {
      type: String,
    },
    optionLabel: {
      type: String,
    },
    optionValue: {
      type: [String, Number],
    },
    labelStyle: {
      type: [Object, Array],
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/style/global.less';

.option-item {
  width: 100%;
  display: flex;
  align-items: center;

  &-label {
    .button-outline(gray);
    width: 100%;
  }

  &-radio {
    &:checked + .default {
      background-color: darkgray;
    }

    &:checked + .label-multiple {
      background-color: darkseagreen;
    }

    &:checked + .label-true {
      background-color: darkgreen;
    }

    &:checked + .label-false {
      background-color: darkred;
    }
  }
}
</style>