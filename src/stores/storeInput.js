import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

/**
 * Store for weight input data.
 */
export const useWeightInputStore = defineStore('weightInput', () => {
  // localStorage https://vueuse.org/core/useLocalStorage/
  const exercises = useLocalStorage('exercises', {})

  /**
   * Saves the input data.
   * @remarks
   * This function can be implemented in the future for saving to a database.
   */
  function saveInput() {
    //TO-DO:
    // for future implementation of saving to database
  }

  /**
   * Adds a working set to the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   */
  function addWorkingSet(date, muscle, selectedExercise) {
    if (!exercises.value[date][muscle][selectedExercise]) {
      return
    }
    exercises.value[date][muscle][selectedExercise].workingSet.push({
      workingSetReps: [],
      workingSetWeight: []
    })
  }

  /**
   * Adds a warm-up set to the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   */
  function addWarmUpSet(date, muscle, selectedExercise) {
    if (!exercises.value[date][muscle][selectedExercise]) {
      return
    }
    exercises.value[date][muscle][selectedExercise].warmUpSet.push({
      warmSetReps: [],
      warmSetWeight: []
    })
  }

  /**
   * Removes the last working set from the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   */
  function removeWorkingSet(date, muscle, selectedExercise) {
    if (!exercises.value[date][muscle][selectedExercise]) {
      return
    }
    exercises.value[date][muscle][selectedExercise].workingSet.pop({
      workingSetReps: [],
      workingSetsWeight: []
    })
  }

  /**
   * Removes the last warm-up set from the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   */
  function removeWarmUpSet(date, muscle, selectedExercise) {
    if (!exercises.value[date][muscle][selectedExercise]) {
      return
    }
    exercises.value[date][muscle][selectedExercise].warmUpSet.pop({
      warmUpSetReps: [],
      warmUpSetsWeight: []
    })
  }

  /**
   * Gets the count of working sets for the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   * @returns {number} The count of working sets.
   */
  function getWorkingSetCount(date, muscle, selectedExercise) {
    if (exercises.value[date][muscle][selectedExercise]) {
      return exercises.value[date][muscle][selectedExercise].workingSet.length
    }
    return 1
  }

  /**
   * Gets the count of warm-up sets for the specified exercise.
   * @param {string} date - The date of the exercise.
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   * @returns {number} The count of warm-up sets.
   */
  function getWarmUpSetCount(date, muscle, selectedExercise) {
    if (exercises.value[date][muscle][selectedExercise]) {
      return exercises.value[date][muscle][selectedExercise].warmUpSet.length
    }
    return 1
  }

  /**
   * Initializes the sets inputs for the specified exercise.
   * @param {string} date - The date of the exercise.F
   * @param {string} muscle - The muscle targeted by the exercise.
   * @param {string} selectedExercise - The selected exercise.
   */
  function initSetsInputs(date, muscle, selectedExercise) {
    if (!exercises.value[date]) {
      exercises.value[date] = {}
    }

    if (!exercises.value[date][muscle]) {
      exercises.value[date][muscle] = {}
    }

    if (!exercises.value[date][muscle][selectedExercise]) {
      exercises.value[date][muscle][selectedExercise] = {
        workingSet: [],
        warmUpSet: []
      }

      exercises.value[date][muscle][selectedExercise].workingSet.push({
        workingSetReps: [],
        workingSetWeight: []
      })

      exercises.value[date][muscle][selectedExercise].warmUpSet.push({
        warmSetReps: [],
        warmSetWeight: []
      })
    }
  }

  return {
    exercises,
    addWorkingSet,
    removeWorkingSet,
    addWarmUpSet,
    removeWarmUpSet,
    getWorkingSetCount,
    getWarmUpSetCount,
    initSetsInputs,
    saveInput
  }
})
