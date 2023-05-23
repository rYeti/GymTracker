import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useWeightInputStore = defineStore(('weightInput'),{
    state: () => reactive ({
        workingSets: [
            {
                selectedExercise: '',
                workingSet: [
                    {
                        workingReps: [],
                        workingSetsWeight: []
                    }
                ],
                workingSetCount: 0,
            }
        ],
        warmUpSets: [
            {
                selectedExercise: '',
                warmUpSet: [
                    {
                        warmUpReps: [],
                        warmUpSetsWeight: [],
                    }
                ],
                warmUpSetCount: 0,
            }
        ],
    }),
    getters: {
    
    },
    actions: {
        removeWorkingSet(selectedExercise) {
            this.sets = this.sets.filter(e => {return e.selectedExercise !== selectedExercise})
        },
        addWorkingSet(selectedExercise, workingSetCount, workingReps, workingSetsWeight){              
            const neWworkingSet = {
            }
        },
        addWarmUpSet(selectedExercise) {
            this.warmUpSets.push({
                selectedExercise: selectedExercise,
                warmUpSets: [],
                warmUpReps: [],
                warmUpSetsWeight: [],
                warmUpSetCount: warmUpSetCount++,
            })
        }
    }
})