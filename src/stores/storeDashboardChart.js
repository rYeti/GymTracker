import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'

/**
 * Store for exercise chart data.
 */
const useExerciseChartStore = defineStore('chart', () => {
  const useExerciseChart = ref([])
  const exercises = useWeightInputStore()

  /**
   * Get the available exercises for a specific date and muscle.
   * @param {string} date - The date to retrieve available exercises for.
   * @param {string} muscle - The muscle to retrieve available exercises for.
   * @returns {string[]} - The list of available exercises.
   */
  function getAvailableExercises(date, muscle) {
    return Object.keys(exercises.exercises[date][muscle])
  }

  /**
   * Get the last set between two dates for a specific muscle and exercise.
   * @param {string} muscle - The muscle to retrieve the last set for.
   * @param {string} exercise - The exercise to retrieve the last set for.
   * @param {Date} fromDate - The start date for the range.
   * @param {Date} toDate - The end date for the range.
   * @returns {object} - The last set object.
   */
  function getLastSetBetweenDates(muscle, exercise, fromDate, toDate) {
    if (!fromDate && !toDate) return
    const filteredData = Object.entries(exercises.exercises)
      .filter(([date]) => {
        const currentDate = new Date(date)
        return currentDate >= fromDate.value && currentDate <= toDate.value
      })
      .map(([, muscleData]) => muscleData[muscle]?.[exercise])
      .filter(Boolean)

    const lastSet = filteredData.reduce((lastSet, muscle) => {
      const sets = muscle[exercise].sets
      if (sets.length > 0) {
        const lastExerciseSet = sets[sets.length - 1]
        if (!lastSet || new Date(lastSet.date) < new Date(lastExerciseSet.date)) {
          return lastExerciseSet
        }
      }
      return lastSet
    }, null)

    return lastSet
  }

  /**
   * Get the last working set for a specific date, muscle, and exercise.
   * if the last working set is empty, return the previous working set, and if there is only one working set that is empty, return.
   * @param {string} date - The date to retrieve the last working set for.
   * @param {string} muscle - The muscle to retrieve the last working set for.
   * @param {string} exercise - The exercise to retrieve the last working set for.
   * @returns {object} - The last working set object.
   */
  function getLastWorkingSet(date, muscle, exercise) {
    if (
      exercises.exercises[date] &&
      exercises.exercises[date][muscle] &&
      exercises.exercises[date][muscle][exercise]
    ) {
      const muscleExercise = Object.keys(exercises.exercises[date][muscle][exercise])
      muscleExercise.pop()
      const workingSet = exercises.exercises[date][muscle][exercise][muscleExercise]
      if (workingSet.length === 1) {
        if (workingSet[0].workingSetReps.length === 0) return
        return workingSet[0]
      }
      if (workingSet[workingSet.length - 1].workingSetReps.length === 0) {
        return workingSet[workingSet.length - 2]
      }
      return workingSet[workingSet.length - 1]
    }
    return
  }

  return {
    useExerciseChart,
    getAvailableExercises,
    getLastSetBetweenDates,
    getLastWorkingSet
  }
})

export default useExerciseChartStore
