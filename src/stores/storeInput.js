import { defineStore } from 'pinia'
import { useExerciseStore } from './storeExercise.js';

//see https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
export const useWeightInputStore = defineStore(('weightInput'),{
    state: () => ({
        selectedExercise: "",
        workingSets: [
            {
                // workingSets: [],
                // workingReps: [],
                // workingSetsWeight: [],
                // workingSetCount: 0,
            }
        ],
        warmUpSets: [
            {
                // warmUpSets: [],
                // warmUpReps: [],
                // warmUpSetsWeight: [],
                // warmUpSetCount: 0,
            }
        ],
    }),
    getters: {
    
    },
    actions: {
        removeWorkingSet(selectedExercise) {
            this.sets = this.sets.filter(e => {return e.selectedExercise !== selectedExercise})
        },
        addWorkingSet(selectedExercise) {
            this.workingSets.push({
                selectedExercise: selectedExercise,
                workingSets: [],
                workingReps: [],
                workingSetsWeight: [],
                workingSetCount: this.workingSetCount++,
            })
        },
        addWarmUpSet(selectedExercise) {
            this.warmUpSets.push({
                selectedExercise: selectedExercise,
                warmUpSets: [],
                warmUpReps: [],
                warmUpSetsWeight: [],
                warmUpSetCount: this.warmUpSetCount++,
            })
        }
    }
})