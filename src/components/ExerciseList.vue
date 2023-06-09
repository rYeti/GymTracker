<template>
  <input  class="search 
    text-black py-2 px-2 rounded mt-5 w-full"  type="date" v-model="exerciseDate">
  <div class="flex">
    <div class="">
  <input class="search 
    text-black py-2 px-2 rounded mt-5" 
    v-model="search"
    type="text" 
    placeholder="Search..."/>
    <div v-bind="containerProps" class="" style="witdh: 25%; height: 500px;">
      <div v-bind="wrapperProps">
      <div class="" v-for="exercise in list" :key="exercise.data.name">
        <button style="height: 38px;" @click="exerciseClick(exercise.data); initSetInput()" :class="isActiveExericse(exercise.data.name)" >{{ exercise.data.name }}</button>
      </div>
    </div>
  </div>
</div>
<div v-if="selectedExercise">
      <WeightsInput :muscle="muscle" :selectedExercise="selectedExercise" :exericseDate="exerciseDate"></WeightsInput>
    </div>
  </div>
</template>

<script setup>

  import { useExerciseStore } from '@/stores/storeExercise.js';
  import { computed, onMounted, ref } from 'vue';
  import WeightsInput from "@/views/weight/WeightsInput.vue";
  import { useWeightInputStore } from '@/stores/storeInput';
  import { useVirtualList } from '@vueuse/core'
  import dayjs from 'dayjs';

  const props = defineProps({
      muscle: Object,
  })

  const search = ref('');
  const json = useExerciseStore()
  const weightInput = useWeightInputStore()
  const exercises = ref([])
  const selectedExercise = ref(null)
  const exerciseDate = ref(dayjs().format('YYYY-MM-DD'));

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

  const filterExericse = computed(() => {
     return exercises.value.filter(e => (e.name.toLowerCase()).includes(search.value.toLowerCase()));
   });

  // https://vueuse.org/core/useVirtualList/#usage
  const { list, containerProps, wrapperProps } = useVirtualList(
    filterExericse,
    {
      itemHeight: 38,
    },
  )

  function isActiveExericse(exercise) {
    return {'exercise-list-button-active': selectedExercise.value != exercise, 'exercise-list-button': selectedExercise.value == exercise}
  }

  const exerciseClick = (exercise) => {
    selectedExercise.value = exercise.name  ;
  };

  const initSetInput = () => {
    console.log(exerciseDate.value)
    weightInput.initSetsInputs(exerciseDate.value, props.muscle, selectedExercise.value);
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
  @apply bg-accent text-white font-bold py-2 px-4 rounded;
}

.exercise-list-button-active {
  @apply bg-secondary-button hover:bg-accent text-white font-bold py-2 px-4 rounded;
}

</style>