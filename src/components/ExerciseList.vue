<template>
    <input class="search 
    text-black py-2 px-2 rounded mt-5" 
    v-model="input"
    type="text" 
    placeholder="Search..." />
    <div class="flex">
    <div class="exerciseList">
      <ul class="exerciseItem" v-for="exercise in filterExercises()" :key="exercise.name">
        <button @click="exerciseClick(exercise); initSetInput()" :class="isActiveExericse(exercise.name)" >{{ exercise.name }}</button>
      </ul>
    </div>
    <div v-if="selectedExercise">
      <WeightsInput :muscle="muscle" :selectedExercise="selectedExercise"></WeightsInput>
    </div>
  </div>
</template>

<script setup>

  import { useExerciseStore } from '@/stores/storeExercise.js';
  import { onMounted, ref } from 'vue';
  import WeightsInput from "@/views/weight/WeightsInput.vue";
  import { useWeightInputStore } from '@/stores/storeInput';

  const props = defineProps({
      muscle: String,
  })

  const json = useExerciseStore()
  const weightInput = useWeightInputStore()
  const exercises = ref([])
  const selectedExercise = ref(null)

  onMounted(async () => {
        await json.fetchMuscleExercise()
        switch (props.muscle) {
          case "Legs":
              exercises.value = json.exerciseList.muscle[0].exercises
              break;
          case "Back":
              exercises.value = json.exerciseList.muscle[1].exercises
              break;
          case "Chest":
              exercises.value = json.exerciseList.muscle[2].exercises
              break;
          case "Shoulder":
              exercises.value = json.exerciseList.muscle[3].exercises
              break;
          case "Biceps":
              exercises.value = json.exerciseList.muscle[4].exercises
              break;
          case "Triceps":
              exercises.value = json.exerciseList.muscle[5].exercises
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

  function isActiveExericse(exercise) {
    return {'exercise-list-button-active': selectedExercise.value != exercise, 'exercise-list-button': selectedExercise.value == exercise}
  }

  const exerciseClick = (exercise) => {
    selectedExercise.value = exercise.name  ;
  };

  const initSetInput = () => {
    weightInput.initSetsInputs(props.muscle, selectedExercise.value);
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

.exercise-list-button {
  @apply bg-secondary-button hover:bg-accent text-white font-bold py-2 px-4 rounded;
}

.exercise-list-button-active {
  @apply bg-accent text-white font-bold py-2 px-4 rounded;
}

</style>