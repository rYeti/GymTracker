<template>
  <div class="w-full m-16">
    <button @click="save()" class="primary-button primary-button-small">Save</button>
    <div class="mt-2">
      <div class="flex justify-end items-center w-[78%]">
        <div class="w-1/3 mb-2">
          <div class="inline mr-4 font-extrabold text-base">Warm-Up Sets</div>
        </div>
        <div class="w-2/3 mb-2 flex justify-end">
          <button
            @click="weightInput.addWarmUpSet(exerciseDate, muscle, selectedExercise)"
            class="primary-button primary-button-small"
          >
            Add
          </button>
          <!-- https://www.designcise.com/web/tutorial/how-to-conditionally-disable-a-button-in-vue-js -->
          <button
            :disabled="weightInput.getWarmUpSetCount(exerciseDate, muscle, selectedExercise) <= 1"
            @click="weightInput.removeWarmUpSet(exerciseDate, muscle, selectedExercise)"
            class="primary-button primary-button-small disabled:opacity-25"
          >
            Remove
          </button>
        </div>
      </div>
      <div
        v-for="(warmUpSet, warmUpSetCount) in weightInput.exercises[exerciseDate][muscle][
          selectedExercise
        ].warmUpSet"
        :key="warmUpSetCount"
        class="flex justify-start"
      >
        <div class="inline mr-1 whitespace-nowrap py-2">Set {{ warmUpSetCount + 1 }}</div>
        <div class="ml-3">
          <input
            v-model="warmUpSet.warmUpWeight"
            type="number"
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm"
            placeholder="Weight (kg)"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          />
        </div>
        <div class="ml-3">
          <input
            v-model="warmUpSet.warmUpReps"
            type="number"
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm"
            placeholder="Reps"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          />
        </div>
      </div>

      <div class="working-set mt-5">
        <div class="flex justify-end items-center w-[78%]">
          <div class="w-1/3 mb-2">
            <div class="inline mr-4 font-extrabold text-base">Working Sets</div>
          </div>
          <div class="w-2/3 mb-2 flex justify-end">
            <button
              @click="weightInput.addWorkingSet(exerciseDate, muscle, selectedExercise)"
              class="primary-button primary-button-small"
            >
              Add
            </button>
            <button
              :disabled="
                weightInput.getWorkingSetCount(exerciseDate, muscle, selectedExercise) <= 1
              "
              @click="weightInput.removeWorkingSet(exerciseDate, muscle, selectedExercise)"
              class="primary-button primary-button-small disabled:opacity-25"
            >
              Remove
            </button>
          </div>
        </div>
        <div>
          <div
            v-for="(workingset, workingSetCount) in weightInput.exercises[exerciseDate][muscle][
              selectedExercise
            ].workingSet"
            :key="workingSetCount"
            class="flex justify-start"
          >
            <div class="inline mr-1 whitespace-nowrap py-2">Set {{ workingSetCount + 1 }}</div>
            <div class="ml-3">
              <input
                v-model="workingset.workingSetWeight"
                type="number"
                class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm"
                placeholder="Weight (Kg)"
                required
                numeric
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              />
            </div>
            <div v-if="shouldShowError(workingSetCount)" class="text-red-500">
              Please fill out the last set.
            </div>
            <div class="ml-3">
              <!-- https://stackoverflow.com/questions/66172698/textbox-which-accepts-only-numbers-in-vue-js -->
              <input
                v-model="workingset.workingSetReps"
                type="number"
                class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm"
                placeholder="Reps"
                required
                numeric
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                @input="validateLastWorkingSet(workingSetCount)"
              />
            </div>
            <div v-if="shouldShowError(workingSetCount)" class="text-red-500">
              Please fill out the last set.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeightInputStore } from '@/stores/storeInput'

const props = defineProps({
  muscle: Object,
  selectedExercise: Object,
  exerciseDate: Object
})

const weightInput = useWeightInputStore()

/**
 * Saves the input data.
 */
function save() {}
</script>
