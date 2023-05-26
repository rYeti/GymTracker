<template>
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-2">
        <label>Warm-Up Sets</label>
        <button @click="addWarmUpSet(selectedExercise)" 
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5">
                Add
        </button>
        <button :disabled="!warmUpSetSmallerOne"
                @click="removeWarmUpSet()"
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5 disabled:opacity-25">
                Remove
        </button>
        <div>
          <div v-for="(warmUpSet, warmUpSetCount) in weightInput.warmUpSets.warmUpSets" :key="warmUpSetCount" class="item flex justify-smart mt-1">
            {{ warmUpSet }}  
          <div class="ml-3">
            <input 
            v-model="weightInput.warmUpSets.warmUpSetsWeight[warmUpSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input 
            v-model="weightInput.warmUpSets.warmUpReps[warmUpSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Reps"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
        </div>  
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="addWorkingSet()" 
        class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-7">
        Add
      </button>
      <button :disabled="!workingSetSmallerOne"
                @click="weightInput.removeWorkingSet(selectedExercise)"
                class="bg-accent hover:bg-primary-button text-white font-bold py-2 px-2 rounded ml-5 disabled:opacity-25">
                Remove
        </button>
        
        <div>
          <div v-for="(workingset, workingSetCount) in weightInput.workingSets" :key="workingSetCount" class="item flex justify-smart mt-1">
            {{ workingset.content }}  
          <div class="ml-3">
            <input
            v-model="weightInput.workingSets.workingSetsWeight[workingSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block rounded-md sm:text-sm " 
            placeholder="Weight (Kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="weightInput.workingSets.workingReps[workingSetCount]" 
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
import { ref, computed } from 'vue';

const selectedExercise = defineProps({
  selectedExercise: String
});

const weightInput = useWeightInputStore();
weightInput.selectedExercise = ref(selectedExercise.selectedExercise);

const addWorkingSet = () => {
weightInput.addWorkingSet(selectedExercise.selectedExercise);
}

const warmUpAddSet = () => { 
  const newWarmUpSet = {
   id: weightInput.warmUpSets.warmUpSetCount++,
   content:weightInput.warmUpSets.warmUpSetCount.toString().concat('. Set'),

  };
  weightInput.workingSetCount;
};

const removeWarmUpSet = () => {
  weightInput.sets.warmUpSets.pop();
  weightInput.sets.warmUpSetsWeight.pop();
  weightInput.sets.warmUpSetCount--;
  };

  const removeWorkingSet = () => {
    weightInput.sets.workingSets.pop();
    weightInput.sets.workingSetsWeight.pop();
    weightInput.sets.workingSetCount--;
    };

  const warmUpSetSmallerOne = computed(() => {
    if (weightInput.warmUpSets.warmUpSetCount < 1) {
      return false;
    } 
    return true;
  });

  const workingSetSmallerOne = computed(() => {
    if (weightInput.workingSets.workingSetCount < 1) {
      return false;
    } 
    return true;
  });

</script>

<style> 

</style>