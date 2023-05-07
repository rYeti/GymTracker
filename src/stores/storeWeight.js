import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core'

//see https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
export const useWeightStore = defineStore({
    id: 'weight',
    state: () => ({
        weight: [],
        reps: []
    }),
    getters: {
        getAllWeights() {
            return this.weight.value
        },
    }, 
    actions: {
        addWeight(weight, reps) {
            this.weight.push(weight);
            this.reps.push(reps);
        },
    }
})