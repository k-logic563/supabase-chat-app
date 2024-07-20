<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue';

import { supabaseClient } from '../libs/supabase/client';
import type { Database } from '../types/db'
import { onMounted } from 'vue';

type DBMessage = Database['public']['Tables']['messages'];

const userId = ref<string>('');
const messageData = ref<DBMessage['Row'][]>([]);
const formData = reactive<DBMessage['Insert']>({
  message: ''
});

const handleSignOut = async () => {
  try {
    await supabaseClient.auth.signOut()
  } catch (e) {
    console.log(e)
  }
};

const fetchMessageData = async () => {
  try {
    const { data } = await supabaseClient
      .from('messages')
      .select();
    if (data) {
      messageData.value = data;
    }
  } catch (e) {
    console.error(e);
  }
}

const handleSubmitMessage = async () => {
  try {
    await supabaseClient
      .from('messages')
      .insert({
        ...formData,
        user_id: userId.value
      });
    formData.message = '';
  } catch (e) {
    console.error(e);
  }
}

fetchMessageData();

const channel = supabaseClient
  .channel('chat')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, fetchMessageData)
  .subscribe()

onBeforeUnmount(() => {
  channel.unsubscribe();
});

onMounted(async () => {
  const { data } = await supabaseClient.auth.getUser();
  if (data.user) {
    userId.value = data.user?.id;
  }
});
</script>

<template>
  <div class="container mx-auto py-[32px]">
    <div class="h-[calc(100vh-64px)] grid grid-rows-[auto_1fr_auto]">
      <header class="p-4 bg-gray-600 text-white rounded-t-md flex justify-between items-center">
        <p class="text-xl">Supabase-chat-app</p>
        <button type="button" class="text-sm" @click="handleSignOut">ログアウト</button>
      </header>
      <main class="p-4 bg-gray-200">
        <ul v-if="messageData.length" class="flex flex-col gap-y-4 items-start">
          <li
            v-for="data in messageData"
            :key="data.id"
            :class="['rounded-full', 'px-4', 'py-2', data.user_id === userId ? 'bg-green-400' : 'bg-gray-100']"
          >
          {{ data.message }}
        </li>
        </ul>
      </main>
      <footer class="p-4 bg-gray-600 text-white rounded-b-md">
        <form @submit.prevent="handleSubmitMessage">
          <div class="flex items-center gap-x-4">
            <input type="text" class="py-2 px-4 rounded flex-1 text-black" v-model="formData.message" placeholder="例)こんにちは〜" required>
            <button type="submit" class="py-2 px-4">送信</button>
          </div>
        </form>
      </footer>
    </div>
  </div>
</template>
