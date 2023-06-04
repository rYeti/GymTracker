import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWeightInputStore = defineStore('weightInput', () => {
    // localStorage https://vueuse.org/core/useLocalStorage/
    const exercises = useLocalStorage('exercises', {});
    
    function addWorkingSet(muscle, selectedExercise) {
        if (!exercises.value[muscle][selectedExercise]) {
            return;
          }
          exercises.value[muscle][selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });
    }

    function addWarmUpSet(muscle, selectedExercise) {
       if (!exercises.value[muscle][selectedExercise]) {
           return;
          }
          exercises.value[muscle][selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
    }

    function removeWorkingSet(muscle, selectedExercise) {
        if(!exercises.value[muscle][selectedExercise]) {
          return
        }
        exercises.value[muscle][selectedExercise].workingSet.pop({
          workingSetReps: [],
          workingSetsWeight: [],
        })
    }
    
    function removeWarmUpSet(muscle, selectedExercise) {
        if(!exercises.value[muscle][selectedExercise]) {
          return;
        }
        exercises.value[muscle][selectedExercise].warmUpSet.pop({
          warmUpSetReps: [],
          warmUpSetsWeight: [],
        })
    }

    function getWorkingSetCount(muscle, selectedExercise) {
        if (exercises.value[muscle][selectedExercise]) {
          return exercises.value[muscle][selectedExercise].workingSet.length;
        }
        return 1;
      }
    
      function getWarmUpSetCount(muscle, selectedExercise) {
        if (exercises.value[muscle][selectedExercise]) {
          return exercises.value[muscle][selectedExercise].warmUpSet.length;
        }
        return 1;
      }

      function initSetsInputs(muscle, selectedExercise) {
        if (!exercises.value[muscle]) {
          exercises.value[muscle] = {};
        }

        if (!exercises.value[muscle][selectedExercise]) {
          exercises.value[muscle][selectedExercise] = {
            workingSet: [],
            warmUpSet: [],
          };

          exercises.value[muscle][selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });

          exercises.value[muscle][selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
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
      initSetsInputs }
    }
)