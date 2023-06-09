<template>
    <div>
        <input @input="getExercises(dateFrom)" v-model="dateFrom" type="date">
    </div>
    <div>
        <input @input="getExercises(dateTo)" v-model="dateTo" type="date">
    </div>
    
    <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
    <h1>{{ muscleGroup.name }}</h1>
    <div v-for="exercise in muscleGroup.exercises" :key="exercise">
      <h2>{{ exercise }}</h2>
      <div v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)" :key="set">
        <div>
          <div>
            <label class=""> {{ dateFrom }}</label>
            <label>%</label>
            <label> {{ dateTo }}</label>
          <div>
            <label> 
              {{ getLastWorkingSetWeight(dateFrom, muscleGroup.name, exercise, set) }} KG 
            </label>
            <label class="text-green-600 mr-3">
              {{ calculateKgDifferencInProcent(getLastWorkingSetWeight(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSetWeight(dateTo, muscleGroup.name, exercise, set)) }}
            </label>
            <label>
              {{ getLastWorkingSetWeight(dateTo, muscleGroup.name, exercise, set) }} KG
            </label>
          </div>
          </div>
          <div>
          </div>
          <div>    
            <div>
              <label>
                {{ getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set) }} Reps     
              </label>
              <label class="text-green-600 mr-3">
                {{  claculateRepsDifferencInProcent(getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSetReps(dateTo, muscleGroup.name, exercise, set)) }}
              </label>
              <label>
                {{ getLastWorkingSetReps(dateTo, muscleGroup.name, exercise, set) }} Reps
              </label>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWeightInputStore } from '@/stores/storeInput';

const exercises = useWeightInputStore();
let muscles = [];
let calcKg = 0;
let calcReps = 0;

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
    return Object.keys(exercises.exercises[date][muscle][exercise]);
  }
  return [];
}
//TODO refactor duplicate code
function getLastWorkingSetWeight(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set];
    const lastWorkingSet = workingSet[workingSet.length - 1];
    return lastWorkingSet;
  }
  return '';
}

function getLastWorkingSetReps(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set];
    const lastWorkingSet = workingSet[workingSet.length - 1];
    return lastWorkingSet.workingSetReps;
  }
  return '';
}

function calculateKgDifferencInProcent(kgFromDate, kgToDate) {
  calcKg = parseFloat(100 - kgFromDate / kgToDate * 100).toFixed(2);
  return calcKg;
}

function claculateRepsDifferencInProcent(repsFromDate, repsToDate) {
  calcReps = parseFloat(100 - repsFromDate / repsToDate * 100).toFixed(2);
  return calcReps;
}

</script>
