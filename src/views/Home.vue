<template>
    <div>
        <input @input="getExercises(dateFrom)" v-model="dateFrom" type="date">
    </div>
    <div>
        <input @input="getExercises(dateTo)" v-model="dateTo" type="date">
    </div>
    
    <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
    <h3>{{ muscleGroup.name }}</h3>
    <div v-for="exercise in muscleGroup.exercises" :key="exercise">
      <h4>{{ exercise }}</h4>
      <div v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)" :key="set">
        <div>
          <div>
            {{ getLastWorkingSetWeight(dateFrom, muscleGroup.name, exercise, set) }} 
          </div>
          <div>          
          {{ getLastWorkingSetWeight(dateTo, muscleGroup.name, exercise, set) }}
          </div>
        </div>
        <div>
          <div>
            {{ getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set) }} 
          </div>
          <div>          
          {{ getLastWorkingSetReps(dateTo, muscleGroup.name, set) }}
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
let kgCalc = 'test';
let repCalc = 'test';

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

// function getExercisesDateTo() {
//     resetMuscleGroups();

//     if(!exercises.exercises[dateTo.value]) return;
//     const muscle = exercises.exercises[dateTo.value];
//     goThoughMuscle(muscle)
// }

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

function getLastWorkingSetWeight(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set];
    const lastWorkingSet = workingSet[workingSet.length - 1];
    return lastWorkingSet.workingSetWeight;
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
    return kgFromDate / kgToDate * 100;
}

function claculateRepsDifferencInProcent(repsFromDate, repsToDate) {
    return repsFromDate / repsToDate * 100;
}

</script>
