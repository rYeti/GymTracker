<template>
    <input class="search 
    text-black py-2 px-2 rounded mt-5" 
    v-model="input"
    type="text" 
    placeholder="Search..." />
    <div class="flex">
    <div class="exerciseList">
      <ul class="exerciseItem" v-for="exercise in filterExercises()" :key="exercise.name">
        <button @click="exerciseClick(exercise)" class="btn bg-secondary-button hover:bg-accent text-white font-bold py-2 px-2 rounded" >{{ exercise.name }}</button>
      </ul>
    </div>
    <div v-if="selectedExercise">
      <WeightsInput :selectedExercise="selectedExercise"></WeightsInput>
    </div>
  </div>
</template>

<script setup>

  import { useExerciseStore } from '@/stores/storeExercise.js';
  import { onMounted, ref } from 'vue';
  import WeightsInput from "@/views/weight/WeightsInput.vue";

  const muscle = defineProps({
      muscle: String,
  })

  const json = useExerciseStore()
  const exercises = ref([])
  const selectedExercise = ref(null)

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

  const exerciseClick = (exercise) => {
    selectedExercise.value = exercise;
    // const existingExercise = selectedExercises.value.find((selected) => selected.name === exercise.name);
    // if (!existingExercise) {
    // selectedExercises.value.push({ exercise, weight: '' });
    // }
  };

//   const selectedExercise = computed(() => {
//   return selectedExercises.value.length > 0 ? selectedExercises.value[0] : null;
// });

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