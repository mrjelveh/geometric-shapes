<template>
    <div v-if="showModal" class="modal">
      <div class="modal__content">
        <span @click="closeModal" class="modal__close">&times;</span>
        <h2 class="modal__header">
          {{ header }}
        </h2>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import './modal.scss';
  
  interface Props {
    header: string;
    showModal: boolean;
  }
  
  withDefaults(defineProps<Props>(), {
    header: '',
    showModal: false,
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>