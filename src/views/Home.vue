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
        <div class="">
          {{ calculateKgDifferencInProcent(getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set), getLastWorkingSet(dateTo, muscleGroup.name, exercise, set)) }}
          <Bar :data="data" :options="config" />
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
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const exercises = useWeightInputStore();
let muscles = [];
let dateFromWorkingSets = [];
let dateToWorkingSets = [];
const calcKg = ref(0);
const calcReps = ref(0);

const chartData = ref({
  labels: ['%'],
  datasets: [
    {
      axis: 'y',
      backgroundColor: '#0eab52',
      data: [10],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  type: 'bar',
  chartData,
  options: {
    indexAxis: 'x',
  }
})

const data = {
  labels: [1, 2, 3, 4, 5],
  datasets: [{
    axis: 'x',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
  }
};

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
  return calcKg.value = parseFloat(100 - kgFromDate / kgToDate * 100).toFixed(2);;
}

function claculateRepsDifferencInProcent(repsFromDate, repsToDate) {
  return calcReps.value = parseFloat(100 - repsFromDate / repsToDate * 100).toFixed(2);;
}

function isNegative(value) {
  return { 'positive-line': value >= 0, 'negative-line': value < 0 };
}

function isNegativeReps(value) {
  return { 'positive-line': value >= 0, 'negative-line': value < 0 };
}

</script>
