<template>
    <input class="search " type="text" v-model="input" placeholder="Search..." />
    <div class="flex">
    <div class="exerciseList">
      <ul class="exerciseItem" v-for="exercise in filterExercises()" :key="exercise.name">
        <Button @click="exerciseClick(exercise)" class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" >{{ exercise.name }}</Button>
      </ul>
    </div>
    <div v-show="isClicked" class="show">
      <label> {{ exerciseName }}</label>
      <WeightsInput/>
    </div>
  </div>
</template>

<script setup>

  import { usePostStore } from '@/stores/store.js';
  import { onMounted, ref } from 'vue';
  import WeightsInput from "@/views/weight/WeightsInput.vue";

  const muscle = defineProps({
      muscle: String,
      warmUpSets: Array,
      workingSets: Array,
      warmUpReps: Array,
      workingReps: Array,
  })

  let isClicked = false
  const json = usePostStore()
  const exercises = ref([])
  let exerciseName = ""

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

const showWeightInput = (isClicked) => {
  isClicked.value = true
}

const exerciseClick = (exercise) => {
    isClicked = true
    exerciseName = exercise.name
    console.log(isClicked)
  }


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