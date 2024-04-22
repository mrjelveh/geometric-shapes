<template>
  <!-- Button component template -->
  <button
    :disabled="props.disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import './button.scss';
import { ButtonType } from './types';

// Define component props with default values
const props = withDefaults(
  defineProps<{
    class?: ButtonType;
    disabled?: boolean;
  }>(),
  {
    class: 'primary',
    disabled: false,
  }
);

// Compute the CSS classes for the button
const classes = computed(() => {
  return [
    'button',
    props.class ? `button--${props.class}` : '',
    props.disabled ? 'button--disabled' : '',
  ];
});

// Define the click event emitter
const emit = defineEmits<{
  (e: 'click', event: Event): void;
}>();

// Handle button click event
const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>
