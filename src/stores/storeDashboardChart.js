import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'

const useExerciseChartStore  = defineStore('chart', () => {
  const useExerciseChart = ref([])
  const exercises = useWeightInputStore();
  const localStorageExercise = ref(JSON.parse(localStorage.getItem('exercises')))

  console.log(localStorageExercise.value)
  
  function getAvailableExercises (date, muscle){
    return Object.keys(exercises.exercises[date][muscle])
  }
  function getLastWorkingSetWeight(exercise){
    return exercise.sets[exercise.sets.length - 1].weight
  }

  function getLastWorkingSetReps(exercise){
    return exercise.sets[exercise.sets.length - 1].reps
  }

  return {
    useExerciseChart, 
    getAvailableExercises,
    getLastWorkingSetWeight,
    getLastWorkingSetReps,
    getExerciseDates,
    chartData
  }
})

export default useExerciseChartStore;
