import {defineStore} from 'pinia'
import muscleExercise from '../assets/muscleExercise';
import { ref } from 'vue'

export const useExerciseStore = defineStore('json', () => {
    const exerciseList = ref([])
    const error = ref([])
   
    async function fetchMuscleExercise() {
        exerciseList.value = muscleExercise
        error.value = []
    }

    return {
        postList: exerciseList, 
        error, 
        fetchMuscleExercise
    }
    }   
)

export default useExerciseStore