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
            @click="weightInput.addWarmUpSet(exericseDate, muscle, selectedExercise)"
            class="primary-button primary-button-small"
          >
            Add
          </button>
          <!-- https://www.designcise.com/web/tutorial/how-to-conditionally-disable-a-button-in-vue-js -->
          <button
            :disabled="weightInput.getWarmUpSetCount(exericseDate, muscle, selectedExercise) <= 1"
            @click="weightInput.removeWarmUpSet(exericseDate, muscle, selectedExercise)"
            class="primary-button primary-button-small disabled:opacity-25"
          >
            Remove
          </button>
        </div>
      </div>
      <div
        v-for="(warmUpSet, warmUpSetCount) in weightInput.exercises[exericseDate][muscle][
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
              @click="weightInput.addWorkingSet(exericseDate, muscle, selectedExercise)"
              class="primary-button primary-button-small"
            >
              Add
            </button>
            <button
              :disabled="
                weightInput.getWorkingSetCount(exericseDate, muscle, selectedExercise) <= 1
              "
              @click="weightInput.removeWorkingSet(exericseDate, muscle, selectedExercise)"
              class="primary-button primary-button-small disabled:opacity-25"
            >
              Remove
            </button>
          </div>
        </div>
        <div>
          <div
            v-for="(workingset, workingSetCount) in weightInput.exercises[exericseDate][muscle][
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
            <div class="ml-3">
              <!-- https://stackoverflow.com/questions/66172698/textbox-which-accepts-only-numbers-in-vue-js -->
              <input
                v-model="workingset.workingSetReps"
                type="number"
                class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm"
                placeholder="Reps"
                required
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              />
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
  exericseDate: Object
})

const weightInput = useWeightInputStore()

function save() {
  alert('Feature not implemented yet. Steys for future development.')
}
</script>
