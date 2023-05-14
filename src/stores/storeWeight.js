import {defineStore} from 'pinia'
//https://vueuse.org/core/useStorage/
import {useStorage} from '@vueuse/core'
import { ref } from 'vue'

//see https://stephanlangeveld.medium.com/simple-local-storage-implementation-using-vue-3-vueuse-and-pinia-with-zero-extra-lines-of-code-cb9ed2cce42a
export const useWeightInputStore = defineStore({
    id: 'weightInput',
    state: () => ({
        workingSets: [],
        workingReps: [],
        warmUpSets: [],
        warmUpReps: [],
        selectedExercise: [],
        warmUpSetCount: 0,
        workingSetCount: 0,
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
        },/*
        addWarmUp(){
            const newWarmUpSet = {
                id: this.warmUpSetCount++,
                content: this.warmUpSetCount.toString().concat('. Set')
              };
              this.warmUpSets.push(newWarmUpSet.content);
        },
        addWorkingSet(){
            const newWorkingSet = {
                id: this.workingSetCount++,
                content: this.workingSetCount.toString().concat('. Set')
              };
              this.workingSets.push(newWorkingSet.content);
        }
        */
    },
/*
    const workingSets = ref([]);
    const workingReps = ref([]);
    const warmUpSets = ref([]);
    const warmUpReps = ref([]);
    const selectedExercise = ref([]);

    function addWeightInput(workingSetWeight, workingRepsInput, warmUpSetsWeight, warmUpRepsInput, selectedExerciseInput) {
        workingSets.value = workingSetWeight;
        workingReps.value  = workingRepsInput;
        warmUpSets.value  = warmUpSetsWeight;
        warmUpReps.value  = warmUpRepsInput;
        selectedExercise.value  = selectedExerciseInput;
        
    }
    return {
        workingSets,
        workingReps,
        warmUpSets,
        warmUpReps,
        selectedExercise,
        addWeightInput
    }
    */
})