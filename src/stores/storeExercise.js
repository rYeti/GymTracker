import { defineStore } from 'pinia'
import muscleExercise from '../assets/muscleExercise'
import { ref } from 'vue'

/**
 * Store for exercise data.
 */
export const useExerciseStore = defineStore('json', () => {
  const exerciseList = ref([])

  /**
   * Fetches the muscle exercise data and updates the exercise list.
   */
  async function fetchMuscleExercise() {
    exerciseList.value = muscleExercise
  }

  return {
    exerciseList,
    fetchMuscleExercise
  }
})
