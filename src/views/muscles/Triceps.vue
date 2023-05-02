<template>
    <div class="triceps">
      <h1>Triceps</h1>
      <input type="text" v-model="input" placeholder="Search..." />
      <div v-for="exercise in filterExercises()" :key="exercise.name">
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
        exercises.value = json.postList.muscle[5].exercises
      }
      )

  let input = ref('');
  function filterExercises(){
    return exercises.value.filter((exercise) => {
      return exercise.name.toLowerCase().includes(input.value.toLowerCase());
    });
  };


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
  