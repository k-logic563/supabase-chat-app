<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import { supabaseClient } from './libs/supabase/client';

const router = useRouter();

const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (_: unknown, session) => {
  if (!session) {
    await router.push('/login');
    return;
  }
  await router.push('/');
});

onBeforeUnmount(() => {
  authListener.subscription.unsubscribe();
});

onMounted(async () => {
  const session = await supabaseClient.auth.getSession();
  if (!session.data) {
    await router.push('/login');
    return;
  }
});
</script>

<template>
  <router-view></router-view>
</template>
