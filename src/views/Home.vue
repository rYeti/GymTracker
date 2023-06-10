<template>
  <div class="flex justify-end">
  <div class="w-1/2">
      <input @input="getExercises(dateFrom)" v-model="dateFrom" type="date" class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1">
  </div>
  <div class="w-1/2">
      <input @input="getExercises(dateTo)" v-model="dateTo" type="date" class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1">
  </div>
  </div>
  <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
  <div class="font-bold mt-2 text-lg text-black bg-primary-button-500" style="max-width: 60%;">{{ muscleGroup.name }}</div>
  <div v-for="exercise in muscleGroup.exercises" :key="exercise">
    <h2 class="font-bold mt-4">{{ exercise }}</h2>
    <div v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)" :key="set">
      <div>
        <div>
          <label> 
            {{ getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set) }} KG 
          </label>
          <label class="text-green-600 mr-3">
            {{ calculateKgDifferencInProcent(getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSet(dateTo, muscleGroup.name, exercise, set)) }}
          </label>
          <label>
            {{ getLastWorkingSet(dateTo, muscleGroup.name, exercise, set) }} KG
          </label>
        </div>
        <div>
        </div>
        <div>    
          <div>
            <label>
              {{ sets.workingSetReps }} Reps     
            </label>
            <label class="text-green-600 mr-3">
              {{  claculateRepsDifferencInProcent(getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSet(dateTo, muscleGroup.name, exercise, set)) }}
            </label>
            <label>
              {{ getLastWorkingSet(dateTo, muscleGroup.name, exercise, set) }} Reps
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
  sets = lastWorkingSet;
  console.log(sets);
  return lastWorkingSet;
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

  return lastWorkingSet;
}
return;
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
