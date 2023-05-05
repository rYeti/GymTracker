<template>
    <input type="text" v-model="input" placeholder="Search..." />
    <div class="exerciseList">
      <li class="exerciseItem" v-for="exercise in filterExercises()" :key="exercise.name">
        <button class="button">{{ exercise.name }}</button>
      </li>
    </div>
</template>

<script setup>

  import { usePostStore } from '@/stores/store.js'
  import { onMounted, ref } from 'vue';
  
  const muscle = defineProps({
      muscle: String
  })

  const json = usePostStore()
  const exercises = ref([])


onMounted(async () => {
      await json.fetchMuscleExercise()
      switch (muscle.muscle) {
        case "Legs":
            exercises.value = json.postList.muscle[0].exercises
            break;
        case "Back":
            exercises.value = json.postList.muscle[1].exercises
            break;
        case "Chest":
            exercises.value = json.postList.muscle[2].exercises
            break;
        case "Shoulder":
            exercises.value = json.postList.muscle[3].exercises
            break;
        case "Biceps":
            exercises.value = json.postList.muscle[4].exercises
            break;
        case "Triceps":
            exercises.value = json.postList.muscle[5].exercises
            break;
      }
    }
    )
  let input = ref('');
  function filterExercises(){
    return exercises.value.filter((exercise) => {
      return exercise.name.toLowerCase().includes(input.value.toLowerCase());
    });
  };

</script>

<style>
.exerciseList{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    margin-top: 0.5rem;
}

</style>