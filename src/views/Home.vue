<template>
  <div class="flex">
    <div class="mr-4">
      <input
        @input="getExercises(dateFrom)"
        v-model="dateFrom"
        type="date"
        class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1"
      />
    </div>
    <div>
      <input
        @input="getExercises(dateTo)"
        v-model="dateTo"
        type="date"
        class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1"
      />
    </div>
  </div>
  <div class="flex-grow">
  <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
    <div class="font-bold mt-2 text-lg text-black bg-primary-button-500 flex-wrap" style="max-width: 35%">
      {{ muscleGroup.name }}
    </div>
    <div class="ml-5" v-for="exercise in muscleGroup.exercises" :key="exercise">
      <h2 class="font-bold mt-4">{{ exercise }}</h2>
      <div>
        <button class="bg-primary-button-500 text-black" @click="exerciseClick(exercise, muscleGroup.name)">View history</button>
      </div>
      <div class="w-1/3 flex">
        <div
          class="mr-7 flex justify-start"
          v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)"
          :key="set"
        >
          <div>
            <div>
              <label> {{ getLastWorkingSet(dateFrom, muscleGroup.name, exercise, set) }} KG </label>
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
        <div
          class="w-1/3 flex justify-center"
          v-for="set in getSetsByMuscleExercise(dateTo, muscleGroup.name, exercise)"
          :key="set"
        >
          <div>
            <div>
              <label> {{ getLastWorkingSet(dateTo, muscleGroup.name, exercise, set) }} KG </label>
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
        <div
          class="ml-6"
          v-for="set in getSetsByMuscleExercise(dateFrom, muscleGroup.name, exercise)"
          :key="set"
        >
        </div>
      </div>
    </div>
  </div>
  <ExerciseChart class="" v-if="selectedExercise"
      :muscle="selectedMuscle"
      :exercise="selectedExercise"
      :fromDate="dateFrom"
      :toDate="dateTo"
    ></ExerciseChart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'
import { ExerciseChart } from '@/components/Index.js'
import useExerciseChartStore from '@/stores/storeDashboardChart';

const exercises = useWeightInputStore();
const chartStore  = useExerciseChartStore();

let muscles = []
const selectedExercise = ref(null)
const selectedMuscle = ref(null)
const lastWorkingSet = ref([])
const muscleGroups = [
  { name: 'Legs', exercises: [] },
  { name: 'Back', exercises: [] },
  { name: 'Chest', exercises: [] },
  { name: 'Shoulders', exercises: [] },
  { name: 'Biceps', exercises: [] },
  { name: 'Triceps', exercises: [] }
]
const dateFrom = ref('')
const dateTo = ref('')
const dateFromWorkingSetsWeight = ref([])
const dateToWorkingSetsWeight = ref([])
const dateFromWorkingSetsReps = ref([])
const dateToWorkingSetsReps = ref([])

function getExercises(date) {
  resetMuscleGroups()
  if (!exercises.exercises[date]) return
  const muscle = exercises.exercises[date]
  goThoughMuscle(date, muscle)
}

const exerciseClick = (exercise, muscleGroupName) => {
  selectedExercise.value = exercise
  selectedMuscle.value = muscleGroupName
  console.log(selectedMuscle.value)
}

function goThoughMuscle(date, muscle) {
  muscles = Object.keys(muscle)

  for (const muscleName of muscles) {
    const muscleIndex = muscleGroups.findIndex((group) => group.name === muscleName)
    if (muscleIndex !== -1) {
      const exercises = getExercisesByMuscle(date, muscleName)
      muscleGroups[muscleIndex].exercises = exercises
    }
  }
}

function resetMuscleGroups() {
  for (const group of muscleGroups) {
    group.exercises = []
  }
}

function getExercisesByMuscle(date, muscle) {
  if (exercises.exercises[date] && exercises.exercises[date][muscle]) {
    console.log(chartStore.getLastSetBetweenDates(Object.keys(exercises.exercises[date][muscle], dateFrom.value, dateTo.value )))

    return Object.keys(exercises.exercises[date][muscle])
  }
  return []
}

function getSetsByMuscleExercise(date, muscle, exercise) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise]
  ) {
    const muscleExercise = Object.keys(exercises.exercises[date][muscle][exercise])
    muscleExercise.pop()
    return muscleExercise
  }
  return []
}
//TODO refactor duplicate code
function getLastWorkingSet(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set]
    lastWorkingSet.value = workingSet[workingSet.length - 1]
    if (date === dateFrom.value) {
      dateFromWorkingSetsWeight.value = lastWorkingSet.value.workingSetWeight
    } else {
      dateToWorkingSetsWeight.value = lastWorkingSet.value.workingSetWeight
    }
    return lastWorkingSet.value.workingSetWeight
  }
  return
}

function getLastWorkingSetReps(date, muscle, exercise, set) {
  if (
    exercises.exercises[date] &&
    exercises.exercises[date][muscle] &&
    exercises.exercises[date][muscle][exercise] &&
    exercises.exercises[date][muscle][exercise][set]
  ) {
    const workingSet = exercises.exercises[date][muscle][exercise][set]
    lastWorkingSet.value = workingSet[workingSet.length - 1]
    if (date === dateFrom.value) {
      dateFromWorkingSetsReps.value = lastWorkingSet.value.workingSetReps
    } else {
      dateToWorkingSetsReps.value = lastWorkingSet.value.workingSetReps
    }
    return lastWorkingSet.value.workingSetReps
  }
  return
}
</script>
