<script setup lang="ts">
import Button from './components/Button/Button.vue';
import Modal from './components/Modal/Modal.vue';

import { ref } from 'vue';

const showModal = ref(false);

const handleClick = () => {
  console.log('clicked');
  showModal.value = !showModal.value;
};
</script>

<template>
  <Button @click="handleClick">Show Modal</Button>

  <Modal header="Modal"  :showModal="showModal" @close="showModal = false">
    <p slot="body">This is a modal</p>
    <Button @click="handleClick">Close Modal</Button>
  </Modal>
  
</template>