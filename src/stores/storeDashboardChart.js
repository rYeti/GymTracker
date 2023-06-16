import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'

const useExerciseChartStore  = defineStore('chart', () => {
  const useExerciseChart = ref([])
  const exercises = useWeightInputStore();
  const localStorageExercise = ref(JSON.parse(localStorage.getItem('exercises')))
  
  function getAvailableExercises (date, muscle){
    console.log(Object.keys(exercises.exercises[date][muscle]))
    return Object.keys(exercises.exercises[date][muscle])
  }
  function getLastWorkingSetWeight(exercise){
    return exercise.sets[exercise.sets.length - 1].weight
  }

  function getLastWorkingSetReps(exercise){
    return exercise.sets[exercise.sets.length - 1].reps
  }

  function getLastSetBetweenDates(exercise, fromDate, toDate) {  
    const filteredData = Object.entries(exercises.exercises)
      .filter(([date]) => {
        const currentDate = new Date(date);
        return currentDate >= fromDate && currentDate <= toDate.value
      })
      .flatMap(([, muscleData]) => Object.values(muscleData))
      .filter((muscle) => muscle[exercise])
      .map((muscle) => muscle[exercise]);
  
    const lastSet = filteredData.reduce((lastSet, muscle) => {
      const sets = muscle[exercise].sets;
      if (sets.length > 0) {
        const lastExerciseSet = sets[sets.length - 1];
        if (!lastSet || new Date(lastSet.date) < new Date(lastExerciseSet.date)) {
          return lastExerciseSet;
        }
      }
      return lastSet;
    }, null);
  
    return lastSet;
  }

  return {
    useExerciseChart, 
    getAvailableExercises,
    getLastWorkingSetWeight,
    getLastWorkingSetReps,
    getLastSetBetweenDates,

  }
})

export default useExerciseChartStore;
