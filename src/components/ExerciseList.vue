<template>
  <div class="flex">
    <div>
      <input
        class="text-black font-semibold py-2 px-2 rounded"
        type="date"
        v-model="exerciseDate"
        style="width: 100%"
        @input="initSetInput()"
      />
      <input
        style="width: 100%"
        class="search text-black font-semibold py-2 px-2 rounded mt-5 mb-1"
        v-model="search"
        type="text"
        placeholder="Search..."
      />
      <div v-bind="containerProps" class="" style="min-width: 400px; height: 500px">
        <div v-bind="wrapperProps" style="min-w: w-full">
          <div class="min-w-full" v-for="exercise in list" :key="exercise.data.name">
            <button
              style="height: 38px"
              @click="exerciseClick(exercise.data); initSetInput()"
              :class="isActiveExericse(exercise.data.name)"
            >
              {{ exercise.data.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedExercise">
      <WeightsInput
        :muscle="muscle"
        :selectedExercise="selectedExercise"
        :exericseDate="exerciseDate"
      ></WeightsInput>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '@/stores/storeExercise.js'
import { computed, onMounted, ref } from 'vue'
import WeightsInput from '@/views/weight/WeightsInput.vue'
import { useWeightInputStore } from '@/stores/storeInput'
import { useVirtualList } from '@vueuse/core'
import dayjs from 'dayjs'

const props = defineProps({
  muscle: String,
  required: true
})

const search = ref('')
const json = useExerciseStore()
const weightInput = useWeightInputStore()
const exercises = ref([])
const exerciseList = ref([])
const selectedExercise = ref(null)
const exerciseDate = ref(dayjs().format('YYYY-MM-DD'))

onMounted(async () => {
  await json.fetchMuscleExercise()
  exerciseList.value = json.exerciseList.muscle
  exercises.value = exerciseList.value.find((m) => m.name === props.muscle)?.exercises ?? []
})

// Filtered exercises based on search input
const filterExericse = computed(() => {
  return exercises.value.filter((e) => e.name.toLowerCase().includes(search.value.toLowerCase()))
})

// Virtual list configuration
// https://vueuse.org/core/useVirtualList/#usage
const { list, containerProps, wrapperProps } = useVirtualList(filterExericse, {
  itemHeight: 38
})

/**
 * Determines the CSS class for the exercise button based on whether it is active or not.
 * @param {string} exercise - The exercise name.
 * @returns {Object} - Object containing CSS classes.
 */
function isActiveExericse(exercise) {
  return {
    'primary-button w-full primary-button-medium': selectedExercise.value != exercise,
    'primary-button-active w-full primary-button-medium': selectedExercise.value == exercise
  }
}

/**
 * Handles the click event of an exercise button.
 * @param {Object} exercise - The selected exercise object.
 */
const exerciseClick = (exercise) => {
  selectedExercise.value = exercise.name
}

/**
 * Initializes the weight input.
 */
const initSetInput = () => {
  weightInput.initSetsInputs(exerciseDate.value, props.muscle, selectedExercise.value)
}
</script>

<style>
</style>