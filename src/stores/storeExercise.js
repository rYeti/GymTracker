import { defineStore } from 'pinia'
import muscleExercise from '../assets/muscleExercise'
import { ref } from 'vue'

export const useExerciseStore = defineStore('json', () => {
  const exerciseList = ref([])
  
  async function fetchMuscleExercise() {
    exerciseList.value = muscleExercise
  }

  return {
    exerciseList,
    fetchMuscleExercise
  }
})
