import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'

const useExerciseChartStore  = defineStore('chart', () => {
  const useExerciseChart = ref([])
  const exercises = useWeightInputStore();
  
  function getAvailableExercises (date, muscle){
    return Object.keys(exercises.exercises[date][muscle])
  }

  function getLastSetBetweenDates(muscle, exercise, fromDate, toDate) {  
    if(!fromDate && !toDate) return
    const filteredData = Object.entries(exercises.exercises)
       .filter(([date]) => {
      const currentDate = new Date(date)
      return currentDate >= fromDate.value && currentDate <= toDate.value
    })
    .map(([, muscleData]) => muscleData[muscle]?.[exercise])
    .filter(Boolean)

      console.log(filteredData)
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

  function getLastWorkingSet(date, muscle, exercise) {
    if (
      exercises.exercises[date] &&
      exercises.exercises[date][muscle] &&
      exercises.exercises[date][muscle][exercise]
    ) {
      const muscleExercise = Object.keys(exercises.exercises[date][muscle][exercise])
      muscleExercise.pop()
      const workingSet = exercises.exercises[date][muscle][exercise][muscleExercise]
      if(workingSet.length === 1) {
        return workingSet[0]
      }  
      return workingSet[workingSet.length - 1]
    }
    return
  }

  return {
    useExerciseChart, 
    getAvailableExercises,
    getLastSetBetweenDates,
    getLastWorkingSet,
  }
})

export default useExerciseChartStore;
