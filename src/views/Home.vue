<template>
  <div class="flex">
    <div class="mr-4">
      <input
        v-model="dateFrom"
        type="date"
        class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1"
        @change="getExercises(dateFrom)"
      />
    </div>
    <div>
      <input
        v-model="dateTo"
        type="date"
        class="text-black font-semibold py-2 px-2 rounded mt-5 mb-1"
        @change="getExercises(dateTo)"
      />
    </div>
  </div>
  <div class="flex-grow">
    <div class="" v-for="muscleGroup in muscleGroups" :key="muscleGroup.name">
      <div
        class="font-bold mt-2 text-lg text-black bg-primary-button-500 flex-wrap"
        style="max-width: 35%"
      >
        {{ muscleGroup.name }}
      </div>
      <div class="ml-5" v-for="exercise in muscleGroup.exercises" :key="exercise">
        <h2 class="font-bold mt-4">{{ exercise }}</h2>
        <div>
          <button
            class="primary-button primary-button-medium"
            @click="exerciseClick(exercise, muscleGroup.name)"
          >
            View history
          </button>
        </div>
        <div class="w-1/3 flex">
          <div class="mr-7 flex justify-start" v-if="dateFrom">
            <div>
              <div>
                <label>
                  {{
                    chartStore.getLastWorkingSet(dateFrom, muscleGroup.name, exercise).workingSetWeight
                  }}
                  KG
                </label>
              </div>
              <div>
                <label>
                  {{
                    chartStore.getLastWorkingSet(dateFrom, muscleGroup.name, exercise).workingSetReps
                  }}
                  Reps
                </label>
              </div>
            </div>
          </div>
          <div class="w-1/3 flex justify-center" v-if="dateTo">
            <div>
              <div>
                <label>
                  {{
                    chartStore.getLastWorkingSet(dateTo, muscleGroup.name, exercise).workingSetWeight
                  }}
                  KG
                </label>
              </div>
              <div>
                <div>
                  <label>
                    {{
                      chartStore.getLastWorkingSet(dateTo, muscleGroup.name, exercise).workingSetReps
                    }}
                    Reps
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 font-bold">{{ selectedExercise }}</div>
    <ExerciseChart
      :muscle="selectedMuscle"
      :exercise="selectedExercise"
      :fromDate="dateFrom"
    >
    </ExerciseChart>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'
import { ExerciseChart } from '@/components/Index.js'
import useExerciseChartStore from '@/stores/storeDashboardChart'

const exercises = useWeightInputStore()
const chartStore = useExerciseChartStore()

let muscles = []
const selectedExercise = ref(null)
const selectedMuscle = ref(null)
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

/**
 * Retrieves exercises for the given date and updates muscleGroups.
 * @param {string} date - The selected date.
 */
function getExercises(date) {
  resetMuscleGroups()
  if (!exercises.exercises[date]) return
  const muscle = exercises.exercises[date]
  goThoughMuscle(date, muscle)
}

/**
 * Handles the click event for an exercise, updates selectedExercise and selectedMuscle.
 * @param {string} exercise - The selected exercise.
 * @param {string} muscleGroupName - The name of the muscle group.
 */
const exerciseClick = (exercise, muscleGroupName) => {
  selectedExercise.value = exercise
  selectedMuscle.value = muscleGroupName
}

/**
 * Iterates through the muscle object to populate muscleGroups.
 * @param {string} date - The selected date.
 * @param {Object} muscle - The muscle object containing exercises.
 */
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

/**
 * Resets the exercises in each muscle group befor populating.
 */
function resetMuscleGroups() {
  for (const group of muscleGroups) {
    group.exercises = []
  }
}

/**
 * Retrieves exercises for a specific muscle on a given date.
 * @param {string} date - The selected date.
 * @param {string} muscle - The name of the muscle group.
 * @returns {string[]} An array of exercises for the muscle on the given date.
 */
function getExercisesByMuscle(date, muscle) {
  if (exercises.exercises[date] && exercises.exercises[date][muscle]) {
    return Object.keys(exercises.exercises[date][muscle])
  }
  return []
}
</script>
