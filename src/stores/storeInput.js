import { defineStore } from 'pinia'
//https://vueuse.org/core/useStorage/
import { useStorage } from '@vueuse/core'
import { useExerciseStore } from './storeExercise.js';

//see https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
export const useWeightInputStore = defineStore({
    id: 'weightInput',
    state: () => ({
        workingSets: useStorage('workingSets', []),
        workingReps: useStorage('workingReps', []),
        workingSetsWeight: useStorage('workingSetsWeight', []),
        warmUpSets: useStorage('warmUpSets', []),
        warmUpReps: useStorage('warmUpReps', []),
        warmUpSetsWeight: useStorage('warmUpSetsWeight', []),
        selectedExercise: [],
        warmUpSetCount: useStorage('warmUpSetCount', 0),
        workingSetCount: useStorage('workingSetCount', 0),
    }),
    getters: {
        getInputsPerExercise : (state) => {
            const exercise = useExerciseStore.exerciseList.value;
            return state.selectedExercise.filter((item) => item.exercise === exercise.exerciseList.value);
        }
    },
    actions: {
        removeWarmUpSet() {
            this.workingSets.pop();
            this.warmUpSetCount--;
        }
    },
})