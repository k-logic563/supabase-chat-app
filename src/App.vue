<script setup lang="ts">
import AuthGuard from './guards/AuthGuard.vue';
</script>

<template>
  <auth-guard>
    <router-view></router-view>
  </auth-guard>
</template>
