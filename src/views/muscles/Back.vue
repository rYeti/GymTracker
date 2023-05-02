<template>
    <div class="back">
      <h1>Back</h1>
      <label> Search</label>
      <button v-for="exercise in exercises" :key="exercise.name">
        {{exercise.name}}
      </button>
    </div>
  </template>

<script setup>
  import { usePostStore } from '@/stores/store.js'
  import { onMounted, ref } from 'vue';

  const json = usePostStore()
  const exercises = ref([])

  onMounted(async () => {
        await json.fetchMuscleExercise()
        exercises.value = json.postList.muscle[1].exercises
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
  