<template>
  <div class="flex">
  <div>
  <input  
    class="text-black font-semibold py-2 px-2 rounded"  
    type="date" 
    v-model="exerciseDate" 
    style="width: 100%;">
  <input style="width: 100%;" 
    class="search text-black font-semibold py-2 px-2 rounded mt-5 mb-1" 
    v-model="search"
    type="text" 
    placeholder="Search..."
    />
    <div v-bind="containerProps" class="" style="min-width: 400px; height: 500px;">
      <div v-bind="wrapperProps" style="min-w: w-full">
      <div class="min-w-full" v-for="exercise in list" :key="exercise.data.name">
        <button style="height: 38px;" @click="exerciseClick(exercise.data); initSetInput()" :class="isActiveExericse(exercise.data.name)" >{{ exercise.data.name }}</button>
      </div>
    </div>
  </div>
</div>
<div v-if="selectedExercise">
      <WeightsInput :muscle="muscle" :selectedExercise="selectedExercise" :exericseDate="exerciseDate"></WeightsInput>
    </div>
  </div>
</template>

<script setup>
  import { useExerciseStore } from '@/stores/storeExercise.js';
  import { computed, onMounted, ref } from 'vue';
  import WeightsInput from "@/views/weight/WeightsInput.vue";
  import { useWeightInputStore } from '@/stores/storeInput';
  import { useVirtualList } from '@vueuse/core'
  import dayjs from 'dayjs';

  const props = defineProps({
      muscle: String,
      required: true,
  })

  const search = ref('');
  const json = useExerciseStore()
  const weightInput = useWeightInputStore()
  const exercises = ref([])
  const exerciseList = ref([]);
  const selectedExercise = ref(null)
  const exerciseDate = ref(dayjs().format('YYYY-MM-DD'));

  onMounted(async () => {
        await json.fetchMuscleExercise();
        exerciseList.value = json.exerciseList.muscle;
        exercises.value = exerciseList.value.find(m => m.name === props.muscle)?.exercises ?? [];
      }
    )

  const filterExericse = computed(() => {
     return exercises.value.filter(e => (e.name.toLowerCase()).includes(search.value.toLowerCase()));
   });

  // https://vueuse.org/core/useVirtualList/#usage
  const { list, containerProps, wrapperProps } = useVirtualList(
    filterExericse,
    {
      itemHeight: 38,
    },
  )

  function isActiveExericse(exercise) {
    return {'primary-button w-full primary-button-medium': selectedExercise.value != exercise, 'primary-button-active w-full primary-button-medium': selectedExercise.value == exercise}
  }

  const exerciseClick = (exercise) => {
    selectedExercise.value = exercise.name  ;
  };

  const initSetInput = () => {
    console.log(exerciseDate.value)
    weightInput.initSetsInputs(exerciseDate.value, props.muscle, selectedExercise.value);
  };

</script>

<style>

.exerciseList{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 0.5rem;
}

.search{
    width: auto;
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    font-size: 1rem;
}

.weights{
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    margin-top: 0.5rem;
    margin-left: 5rem;
    color: white;
}

.set{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.25rem;
    margin-top: 0.5rem;
    color: white;
}


</style>