<script setup lang="ts">
import { getUserProfile } from '@/api/user'
import type { UserProfile } from '@/types/user'
import { ref } from 'vue'
const profile = ref<UserProfile | null>(null)
getUserProfile().then((res) => {
  profile.value = res.data.data
  console.log(res.data.data)
})
</script>
<template>
  <div class="about">
    <h1 v-if="profile">{{ profile.displayName }}</h1>
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
