<script setup lang="ts">
import { supabaseClient } from '../libs/supabase/client';

const handleSigninWithAnonymous = async () => {
  try {
    await supabaseClient.auth.signInAnonymously()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="min-h-screen grid place-items-center">
    <button type="button" @click="handleSigninWithAnonymous" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign-in with anonymous</button>
  </div>
</template>
