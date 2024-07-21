<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import { supabaseClient } from '../libs/supabase/client';

const router = useRouter();
const route = useRoute();

const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (_: unknown, session) => {
  // セッション中、かつログインページ
  // トップへリダイレクト
  const isLoginPage = route.path === '/login';
  if (session && isLoginPage) {
    await router.push('/');
    return;
  }
  // サインアウト
  if (!session) {
    await router.push('/login');
    return;
  }
});

onBeforeUnmount(() => {
  authListener.subscription.unsubscribe();
});
</script>

<template>
  <slot />
</template>
