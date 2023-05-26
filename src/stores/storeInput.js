import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useWeightInputStore = defineStore(('weightInput'), {
    state: () => reactive ({
        workingSets: [
            {
                selectedExercise: '',
                workingReps: [],
                workingSetsWeight: [],
                workingSetCount: 0,
                /*
                selectedExercise: '',
                workingSet: [
                    {
                        workingReps: [],
                        workingSetsWeight: []
                    }
                ],
                workingSetReps: [],
                workingSetWeight: [],
                workingSetCount: 0,
                */
            }
        ],
        warmUpSets: [
            {
                selectedExercise: '',
                warmUpReps: [],
                warmUpSetsWeight: [],
                warmUpSetCount: 0,
                /*
                selectedExercise: '',
                warmUpSet: [
                    {
                        warmUpReps: [0,],
                        warmUpSetsWeight: [0,],
                    }
                ],
                warmUpSetReps: [],
                warmUpSetWeight: [],
                warmUpSetCount: 0,*/
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
            const targetExercise = this.state.find(set => set.selectedExercise.name === selectedExercise);
            if(targetExercise) {
                targetExercise.warmUpReps.push([]);
                targetExercise.warmUpSetsWeight.push([]);
                targetExercise.warmUpSetCount++;
            } else {
                this.workingSets.push({
                  selectedExercise,
                  workingReps: [],
                  workingSetsWeight: [],
                  workingSetCount: 1,
                })
              }  
        },
        addWarmUpSet(selectedExercise) {
            this.warmUpSets.push({
                warmUpSets: [],
                warmUpReps: [],
                warmUpSetsWeight: [],
                warmUpSetCount: warmUpSetCount++,
            })
        },
        initInputs(selectedExercise) {
            this.workingSets.push({
                selectedExercise: selectedExercise,
                workingSetReps: [],
                workingSetsWeight: [],
                workingSetCount: 1,
            })
            this.warmUpSets.push({
                selectedExercise: selectedExercise,
                warmUpReps: [],
                warmUpSetsWeight: [],
                warmUpSetCount: 1,
            })
        }
    }
})