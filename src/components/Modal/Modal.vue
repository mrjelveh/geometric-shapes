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

<script>
import { h } from 'vue';
import './modal.scss';
export default {
    name: 'Modal',
    props: {
        header: {
            type: String,
            required: true
        },
        showModal: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>