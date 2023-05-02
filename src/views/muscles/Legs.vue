<template>
    <div class="legs">
      <h1>Legs</h1>
      <div v-for="post in post.postList">
        <h2>{{post.exercise}}</h2>
        <p>{{post.body}}</p>
      </div>
    </div>
  </template>

<script setup>
  import { usePostStore } from '@/stores/post.js'
  import { onMounted } from 'vue';

  const post = usePostStore()

  onMounted(() => {
       post.fetchMuscleExercise()
     }
     )

</script>
  
<style>
</style>
  