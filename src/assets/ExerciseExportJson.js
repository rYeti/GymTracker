/*
import { usePostStore } from '@/stores/store.js'
import { onMounted, ref } from 'vue';

const json = usePostStore()
const exercises = ref([])
export const muscle = ref("")

onMounted(async () => {
      await json.fetchMuscleExercise()
      switch (muscle) {
        case "legs":
            exercises.value = json.postList.muscle[0].exercises
        case "back":
            exercises.value = json.postList.muscle[1].exercises
        case "chest":
            exercises.value = json.postList.muscle[2].exercises
        case "shoulders":
            exercises.value = json.postList.muscle[3].exercises
        case "biceps":
            exercises.value = json.postList.muscle[4].exercises
        case "triceps":
            exercises.value = json.postList.muscle[5].exercises
      }
    }
    )
/*
let input = ref('');
export function filterExercises(){
  return exercises.value.filter((exercise) => {
    return exercise.name.toLowerCase().includes(input.value.toLowerCase());
  });
};
*/
