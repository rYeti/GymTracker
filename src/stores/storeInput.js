import { defineStore } from 'pinia'
// import { reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useWeightInputStore = defineStore('weightInput', () => {
    // localStorage https://vueuse.org/core/useLocalStorage/
    const exercises = useLocalStorage('exercises', {});
    
    function addWorkingSet(selectedExercise) {
        if (!exercises.value[selectedExercise]) {
            exercises.value[selectedExercise] = {
              workingSet: [],
            };
            exercises.value[selectedExercise].workingSet.push({
                workingSetReps: [],
                workingSetWeight: [],});
          }
          exercises.value[selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });
    }

    function addWarmUpSet(selectedExercise) {
        if (!exercises.value[selectedExercise]) {
            exercises.value[selectedExercise] = {
                warmUpSet: [],
            };
            exercises.value[selectedExercise].warmUpSet.push({
                warmSetReps: [],
                warmSetWeight: [],});
          }
          exercises.value[selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
    }

    function removeWorkingSet(selectedExercise) {
        if(exercises.value[selectedExercise]) {
            exercises.workingSet.pop({
            workingSetReps: [],
            workingSetsWeight: [],
            })
        }
    }
    
    function removeWarmUpSet(selectedExercise) {
        if(exercises.value[selectedExercise]) {
            exercises.warmUpSet.pop({
            warmUpSetReps: [],
            warmUpSetsWeight: [],
            })
        }
    }

    function getWorkingSetCount(selectedExercise) {
        if (exercises.value[selectedExercise]) {
          return exercises.value[selectedExercise].workingSet.length;
        }
        return 0;
      }
    
      function getWarmUpSetCount(selectedExercise) {
        if (exercises.value[selectedExercise]) {
          return exercises.value[selectedExercise].warmUpSet.length;
        }
        return 0;
      }

      function initSetsInputs(selectedExercise) {
        if(!exercises.value[selectedExercise]) {
            exercises.value[selectedExercise] = {
                workingSet: [],
                warmUpSet: [],
              };
            };
        exercises.value[selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });
          exercises.value[selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
    }     

    return { exercises, addWorkingSet, removeWorkingSet, addWarmUpSet, removeWarmUpSet, getWorkingSetCount, getWarmUpSetCount, initSetsInputs }

    }
)