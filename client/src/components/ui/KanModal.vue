<script setup>
defineProps(['isOpen'])
defineEmits(['close'])
</script>

<template>
  <teleport to="#modal" v-if="isOpen">
    <div class="modal-bg" @click="$emit('close')">
      <div class="modal" @click.stop>
        <slot />
        <!-- anything you put inside <Modal> renders here -->
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
