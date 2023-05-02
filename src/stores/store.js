import {defineStore} from 'pinia'
import muscleExercise from '../assets/muscleExercise';
import { ref } from 'vue'

export const usePostStore = defineStore('json', () => {
    const postList = ref([])
    const error = ref([])
   
    async function fetchMuscleExercise() {
        postList.value = muscleExercise
        error.value = []
    }

    return {
        postList, 
        error, 
        fetchMuscleExercise
    }
    }   
)

export default usePostStore