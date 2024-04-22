<script lang="ts">
import Button from './components/Button/Button.vue';
import Modal from './components/Modal/Modal.vue';
import CanvasPanel from './layouts/CanvasPanel/CanvasPanel.vue';

import { ref } from 'vue';

export default {
  components: {
    Button,
    Modal,
    CanvasPanel,
  }
};
</script>

<template>
    <CanvasPanel/>  
</template>