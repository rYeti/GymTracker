import { defineStore } from 'pinia'
// import { reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useWeightInputStore = defineStore('weightInput', () => {
    // localStorage https://vueuse.org/core/useLocalStorage/
    const exercises = useLocalStorage('exercises', {});
    
    function addWorkingSet(selectedExercise) {
        if (!exercises.value[selectedExercise]) {
            return;
          }
          exercises.value[selectedExercise].workingSet.push({
            workingSetReps: [],
            workingSetWeight: [],
          });

          console.log('Added working set:', exercises.value[selectedExercise]);
    }

    function addWarmUpSet(selectedExercise) {
       if (!exercises.value[selectedExercise]) {
           return;
          }
          exercises.value[selectedExercise].warmUpSet.push({
            warmSetReps: [],
            warmSetWeight: [],
          });
    }

    function removeWorkingSet(selectedExercise) {
        if(!exercises.value[selectedExercise]) {
          return
        }
        exercises.value[selectedExercise].workingSet.pop({
          workingSetReps: [],
          workingSetsWeight: [],
        })
    }
    
    function removeWarmUpSet(selectedExercise) {
        if(!exercises.value[selectedExercise]) {
          return;
        }
        exercises.value[selectedExercise].warmUpSet.pop({
          warmUpSetReps: [],
          warmUpSetsWeight: [],
        })
    }

    function getWorkingSetCount(selectedExercise) {
        if (exercises.value[selectedExercise]) {
          return exercises.value[selectedExercise].workingSet.length;
        }
        return 1;
      }
    
      function getWarmUpSetCount(selectedExercise) {
        if (exercises.value[selectedExercise]) {
          return exercises.value[selectedExercise].warmUpSet.length;
        }
        return 1;
      }

      function initSetsInputs(selectedExercise) {
        if(!exercises.value[selectedExercise]) {
            exercises.value[selectedExercise] = {
                workingSet: [],
                warmUpSet: [],
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
        console.log('Init sets inputs:', exercises.value[selectedExercise], selectedExercise);
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