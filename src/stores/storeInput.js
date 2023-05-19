import {defineStore} from 'pinia'
//https://vueuse.org/core/useStorage/
import {useStorage} from '@vueuse/core'

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
        selectedExercise: useStorage('selectedExercise', []),
        warmUpSetCount: useStorage('warmUpSetCount', 0),
        workingSetCount: useStorage('workingSetCount', 0),
    }),
    getters: {
        getAllWeights(state) {
            return state.weight;
        },
    },
    actions: {
        addWeight(weight, reps) {
            this.weight.push(weight);
            this.reps.push(reps);
        },
    },
})