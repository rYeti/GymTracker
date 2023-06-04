<template>

    <div class="w-2/3 mx-auto">
      <div class="mt-2">
        <label>Warm-Up Sets</label>
        <button @click="weightInput.addWarmUpSet(muslce, selectedExercise)" 
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5">
                Add
        </button>
        <!-- https://www.designcise.com/web/tutorial/how-to-conditionally-disable-a-button-in-vue-js -->
        <button :disabled="weightInput.getWarmUpSetCount(muslce, selectedExercisep) <= 1"
                @click="weightInput.removeWarmUpSet(muslce, selectedExercise)"
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5 disabled:opacity-25">
                Remove
        </button>
        
          <div v-for="(warmUpSet, warmUpSetCount) in weightInput.exercises[muscle][selectedExerciseProp].warmUpSet" :key="warmUpSetCount" 
          class="flex ml-2">
          <label>Set {{ warmUpSetCount + 1 }}</label>
          <div class="ml-3">
            <input 
            v-model="warmUpSet.warmUpWeight" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <div class="ml-3">
            <input 
            v-model="warmUpSet.warmUpReps" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Reps"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
        </div>  
      
      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="weightInput.addWorkingSet(muslce, selectedExercise)" 
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-7">
                Add
      </button>
      <button  :disabled="weightInput.getWorkingSetCount(muslce, selectedExercise) <= 1"
                @click="weightInput.removeWorkingSet(muslce, selectedExercise)"
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5 disabled:opacity-25">
                Remove
        </button>
        
        <div>
          <div v-for="(workingset, workingSetCount) in weightInput.exercises[muscle][selectedExerciseProp].workingSet" :key="workingSetCount" class="item flex justify-smart mt-1">
            <label class=""> {{ workingSetCount + 1 }}. Set</label>
          <div class="ml-3">
            <input
            v-model="workingset.workingSetWeight"
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (Kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <div class="ml-3">
            <input 
            v-model="workingset.workingSetReps" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Reps"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'> <!-- https://stackoverflow.com/questions/66172698/textbox-which-accepts-only-numbers-in-vue-js -->
          </div>
        </div>  
      </div>
      </div>
    </div>  
    </div>

</template>

<script setup>
import { useWeightInputStore } from '@/stores/storeInput';
import { ref } from 'vue';

const props = defineProps({
  muscle: String,
  selectedExercise: String,
});

const weightInput = useWeightInputStore();
weightInput.selectedExercise = ref(props.selectedExercise);

</script>