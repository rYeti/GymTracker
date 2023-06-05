import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWeightInputStore = defineStore('weightInput', () => {
    // localStorage https://vueuse.org/core/useLocalStorage/
    const exercises = useLocalStorage('exercises', {});
    
    function addWorkingSet(date, muscle, selectedExercise) {
        if (!exercises.value[date][muscle][selectedExercise]) {
            return;
          }
          exercises.value[date][muscle][selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });
    }

    function addWarmUpSet(date, muscle, selectedExercise) {
       if (!exercises.value[date][muscle][selectedExercise]) {
           return;
          }
          exercises.value[date][muscle][selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
    }

    function removeWorkingSet(date, muscle, selectedExercise) {
        if(!exercises.value[date][muscle][selectedExercise]) {
          return
        }
        exercises.value[date][muscle][selectedExercise].workingSet.pop({
          workingSetReps: [],
          workingSetsWeight: [],
        })
    }
    
    function removeWarmUpSet(date, muscle, selectedExercise) {
        if(!exercises.value[date][muscle][selectedExercise]) {
          return;
        }
        exercises.value[date][muscle][selectedExercise].warmUpSet.pop({
          warmUpSetReps: [],
          warmUpSetsWeight: [],
        })
    }

    function getWorkingSetCount(date, muscle, selectedExercise) {
        if (exercises.value[date][muscle][selectedExercise]) {
          return exercises.value[date][muscle][selectedExercise].workingSet.length;
        }
        return 1;
      }
    
      function getWarmUpSetCount(date, muscle, selectedExercise) {
        if (exercises.value[date][muscle][selectedExercise]) {
          return exercises.value[date][muscle][selectedExercise].warmUpSet.length;
        }
        return 1;
      }

      function initSetsInputs(date, muscle, selectedExercise) {
        console.log(date, muscle, selectedExercise)
        if(!exercises.value[date]) {
          exercises.value[date] = {};
        }

        if (!exercises.value[date][muscle]) {
          exercises.value[date][muscle] = {};
        }

        if (!exercises.value[date][muscle][selectedExercise]) {
          exercises.value[date][muscle][selectedExercise] = {
            workingSet: [],
            warmUpSet: [],
          };

          exercises.value[date][muscle][selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });

          exercises.value[date][muscle][selectedExercise].warmUpSet.push({
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