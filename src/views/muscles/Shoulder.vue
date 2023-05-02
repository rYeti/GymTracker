<template>
    <div class="shoulder">
      <h1>Shoulder</h1>
      <label> Search</label>
      <div v-for="exercise in exercises" :key="exercise.name">
        <button>{{ exercise.name }}</button>
      </div>
    </div>
  </template>

<script setup>
  import { usePostStore } from '@/stores/store.js'
  import { onMounted, ref } from 'vue';

  const json = usePostStore()
  const exercises = ref([])

  onMounted(async () => {
        await json.fetchMuscleExercise()
        exercises.value = json.postList.muscle[3].exercises
      }
      )

</script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  