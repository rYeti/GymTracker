import {defineStore} from 'pinia'
import muscleExercise from '../assets/muscleExercise';
import { ref } from 'vue'

export const usePostStore = defineStore('post', () => {
    const postList = ref([])
    const currentPost = ref(null)
    const error = ref(null)
   
    async function fetchMuscleExercise() {
        postList.value = muscleExercise
        error.value = []
    }

    return {
        postList, 
        currentPost, 
        error, 
        fetchMuscleExercise
    }
    }   
)

export default usePostStore