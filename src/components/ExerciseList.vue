<template>
    <input class="search" type="text" v-model="input" placeholder="Search..." />
    <div class="exerciseList">
      <ul class="exerciseItem" v-for="exercise in filterExercises()" :key="exercise.name">
        <Button class="btn" :class="{'btn--primary': primary}">{{ exercise.name }}</Button>
      </ul>
      <div class="weights">
        <WeightsInput/> 
        <router-link to="/" class="nav-item nav-link">Home</router-link>
      </div>
    </div>
</template>

<script setup>

  import { usePostStore } from '@/stores/store.js';
  import { onMounted, ref } from 'vue';
  // import { weightsInput } from '@/views/weight/index.js';

  const muscle = defineProps({
      muscle: String
  })

  const primary = true
  const json = usePostStore()
  const exercises = ref([])

  onMounted(async () => {
        await json.fetchMuscleExercise()
        switch (muscle.muscle) {
          case "Legs":
              exercises.value = json.postList.muscle[0].exercises
              break;
          case "Back":
              exercises.value = json.postList.muscle[1].exercises
              break;
          case "Chest":
              exercises.value = json.postList.muscle[2].exercises
              break;
          case "Shoulder":
              exercises.value = json.postList.muscle[3].exercises
              break;
          case "Biceps":
              exercises.value = json.postList.muscle[4].exercises
              break;
          case "Triceps":
              exercises.value = json.postList.muscle[5].exercises
              break;
        }
      }
    )

  // filter exercises with help from https://blog.logrocket.com/create-search-bar-vue/ last accessed 05.05.2023 
  let input = ref('');
  function filterExercises(){
    return exercises.value.filter((exercise) => {
      return exercise.name.toLowerCase().includes(input.value.toLowerCase());
    });
  };

</script>

<style>

.exerciseList{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 0.5rem;
}

.search{
    width: auto;
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    font-size: 1rem;
}

.weights{
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    margin-top: 0.5rem;
    margin-left: 5rem;
    color: white;
}

.set{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 0.5rem;
    color: white;

}
</style>