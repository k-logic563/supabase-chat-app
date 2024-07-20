<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import { supabaseClient } from './libs/supabase/client';

const router = useRouter();

const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
  // サインイン
  if (session && event === 'SIGNED_IN') {
    await router.push('/');
    return;
  }
  // サインアウト
  if (!session && event === 'SIGNED_OUT') {
    await router.push('/login');
    return;
  }
});

onBeforeUnmount(() => {
  authListener.subscription.unsubscribe();
});
</script>

<template>
  <router-view></router-view>
</template>
