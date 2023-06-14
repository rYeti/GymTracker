<template>
  <div class="flex">
    <div class="mr-4">
        <input @input="getExercises(dateFrom)" v-model="dateFrom" type="date" class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1">
    </div>
    <div class="">
        <input @input="getExercises(dateTo)" v-model="dateTo" type="date" class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1">
    </div>
  </div>
  <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
    <div class="font-bold mt-2 text-lg text-black bg-primary-button-500" style="max-width: 35%;">{{ muscleGroup.name }}</div>
    <div class="ml-5" v-for="exercise in muscleGroup.exercises" :key="exercise">
      <h2 class="font-bold mt-4">{{ exercise }}</h2>
      <div class="w-1/3 flex">
        <div class="mr-7 flex justify-start" v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)" :key="set">
          <div>
            <div>
              <label> 
                {{ getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set) }} KG 
              </label>
            </div>
            <div>    
              <div>
                <label>
                  {{ getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set) }} Reps     
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 flex justify-center" v-for="set in getSetsByMuscleExercise(dateTo, muscleGroup.name, exercise)" :key="set">
          <div>
            <div>
              <label>
                {{ getLastWorkingSet(dateTo, muscleGroup.name, exercise, set) }} KG
              </label>
            </div>
            <div>    
              <div>
                <label>
                  {{ getLastWorkingSetReps(dateTo, muscleGroup.name, exercise, set) }} Reps
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-6" v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)" :key="set">
          <div >
            <div class="">
              {{ calculateKgDifferencInProcent(getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSet(dateTo, muscleGroup.name, exercise, set)) }}
            </div>
          </div>
          <div>
            <label class="">
              {{  claculateRepsDifferencInProcent(getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSetReps(dateTo, muscleGroup.name, exercise, set)) }}
            </label>
          </div>
        </div>
        <div class="w-1/3 ml-7">
          <ExerciseChart :muscle="muscleGroup.name" :exercise="exercise" :fromDate="dateFrom" :toDate="dateTo"></ExerciseChart>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useWeightInputStore } from '@/stores/storeInput';
import { ExerciseChart } from '@/components/Index.js';

const exercises = useWeightInputStore();

let muscles = [];

const calcKg = ref(0);
const calcReps = ref(0);
const lastWorkingSet = ref([]);
const muscleGroups = [
{ name: 'Legs', exercises: [] },
{ name: 'Back', exercises: [] },
{ name: 'Chest', exercises: [] },
{ name: 'Shoulders', exercises: [] },
{ name: 'Biceps', exercises: [] },
{ name: 'Triceps', exercises: [] }
];
const dateFrom = ref('');
const dateTo = ref('');
const dateFromWorkingSetsWeight = ref([]);
const dateToWorkingSetsWeight = ref([]);
const dateFromWorkingSetsReps = ref([]);
const dateToWorkingSetsReps = ref([]);

function getExercises(date) {  
  resetMuscleGroups();

  if(!exercises.exercises[date]) return;
  const muscle = exercises.exercises[date];
  goThoughMuscle(date, muscle)
}

function goThoughMuscle(date, muscle) {
  muscles = Object.keys(muscle);

  for (const muscleName of muscles) {
      const muscleIndex = muscleGroups.findIndex((group) => group.name === muscleName);
      if (muscleIndex !== -1) {
        const exercises = getExercisesByMuscle(date, muscleName);
        muscleGroups[muscleIndex].exercises = exercises;
      }
  }
}

function resetMuscleGroups() {
  for (const group of muscleGroups) {
    group.exercises = [];
  }
}

function getExercisesByMuscle(date, muscle) {
  if (exercises.exercises[date] && exercises.exercises[date][muscle]) {
    return Object.keys(exercises.exercises[date][muscle]);
  }
return [];
}

function getSetsByMuscleExercise(date, muscle, exercise) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise]
  ) {
    const muscleExercise = Object.keys(exercises.exercises[date][muscle][exercise]);
    muscleExercise.pop();
    return muscleExercise;
  }
  return [];
}
//TODO refactor duplicate code
function getLastWorkingSet(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set];
    lastWorkingSet.value = workingSet[workingSet.length - 1];
    if(date === dateFrom.value) {
      dateFromWorkingSetsWeight.value = lastWorkingSet.value.workingSetWeight;
    } else {
      dateToWorkingSetsWeight.value = lastWorkingSet.value.workingSetWeight;
    }
    return lastWorkingSet.value.workingSetWeight;
  }
  return;
}

function getLastWorkingSetReps(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set];
    lastWorkingSet.value = workingSet[workingSet.length - 1];
    if(date === dateFrom.value) {
      dateFromWorkingSetsReps.value = lastWorkingSet.value.workingSetReps;
    } else {
      dateToWorkingSetsReps.value = lastWorkingSet.value.workingSetReps;
    }
    return lastWorkingSet.value.workingSetReps;
  }
  return;
}

function calculateKgDifferencInProcent(kgFromDate, kgToDate) {
  return calcKg.value = parseFloat(100 - kgFromDate / kgToDate * 100).toFixed(2);
}

function claculateRepsDifferencInProcent(repsFromDate, repsToDate) {
  return calcReps.value = parseFloat(100 - repsFromDate / repsToDate * 100).toFixed(2);
}
console.log(muscleGroups)

</script>
