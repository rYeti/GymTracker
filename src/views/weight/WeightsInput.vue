<template>
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-2">
        <label>Warm-Up Sets</label>
        <button @click="warmUpAddSet()" 
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5">
                Add
        </button>
        <div>
          <div v-for="(warmUpSet, warmUpSetCount) in weightInput.warmUpSets" :key="warmUpSetCount" class="item flex justify-smart mt-1">
            {{ warmUpSet }}  
          <div class="ml-3">
            <input 
            v-model="weightInput.warmUpSetsWeight[warmUpSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input 
            v-model="weightInput.warmUpReps[warmUpSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Reps"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
        </div>  
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="workingAddSet()" 
        class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-7">
        Add
      </button>
        
        <div>
          <div v-for="(workingset, workingSetCount) in weightInput.workingSets" :key="workingSetCount" class="item flex justify-smart mt-1">
            {{ workingset }}  
          <div class="ml-3">
            <input
            v-model="weightInput.workingSetsWeight[workingSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (Kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="weightInput.workingReps[workingSetCount]" 
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

const selectedExercise = defineProps({
  selectedExercise: String
});

const weightInput = useWeightInputStore();

const warmUpAddSet = () => { 
  const newWarmUpSet = {
    id: weightInput.warmUpSetCount++,
    content: weightInput.warmUpSetCount.toString().concat('. Set')
  };
  weightInput.warmUpSets.push(newWarmUpSet.content);
};

const workingAddSet = () => {   
  const newWorkingSet = {
    id: weightInput.workingSetCount++,
    content: weightInput.workingSetCount.toString().concat('. Set')
  };
  weightInput.workingSets.push(newWorkingSet.content);
};

</script>

<style> 

</style>