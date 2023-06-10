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
        <div class="" :class="isNegative(calcKg)">
            {{ calculateKgDifferencInProcent(getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSet(dateTo, muscleGroup.name, exercise, set)) }}
        </div>
      </div>
      <div>
        <label class="" :class="isNegativeReps(calcReps)">
              {{  claculateRepsDifferencInProcent(getLastWorkingSetReps(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSetReps(dateTo, muscleGroup.name, exercise, set)) }}
        </label>
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
let dateFromWorkingSets = [];
let dateToWorkingSets = [];
let calcKg = 0;
let calcReps = 0;
let sets = []

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
    const muscleExercise = Object.keys(exercises.exercises[date][muscle][exercise]);
    muscleExercise.pop();
    console.log(muscleExercise);
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
    const lastWorkingSet = workingSet[workingSet.length - 1];
    if(workingSet[date] === dateFrom) {
      dateFromWorkingSets.push(lastWorkingSet.workingSetWeight);
    } else {
      dateToWorkingSets.push(lastWorkingSet.workingSetWeight);
    }
    return lastWorkingSet.workingSetWeight;
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
    const lastWorkingSet = workingSet[workingSet.length - 1];
    if(workingSet[date] === dateFrom) {
      dateFromWorkingSets.push(lastWorkingSet.workingSetWeight);
    } else {
      dateToWorkingSets.push(lastWorkingSet.workingSetWeight);
    }
    return lastWorkingSet.workingSetReps;
  }
  return;
}

function calculateKgDifferencInProcent(kgFromDate, kgToDate) {
  return calcKg = parseFloat(100 - kgFromDate / kgToDate * 100).toFixed(2);;
}

function claculateRepsDifferencInProcent(repsFromDate, repsToDate) {

  return calcReps = parseFloat(100 - repsFromDate / repsToDate * 100).toFixed(2);;
}

function isNegative(value) {
  return { 'positive-line': value >= 0, 'negative-line': value < 0 };
}

function isNegativeReps(value) {
  return { 'positive-line': value >= 0, 'negative-line': value < 0 };
}

</script>
