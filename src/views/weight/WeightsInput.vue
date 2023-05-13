<template>
  //TODO make view resposive on button click add
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-12 w-2/3">
        <label>Warm-Up Sets</label>
        <button @click="warmUpAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-5">Add</button>
        <div>
          <div v-for="(warmUpSet, warmUpSetCount) in warmUpSets" :key="warmUpSetCount" class="item flex justify-smart mt-1">
            {{ warmUpSet }}  
          <div class="ml-3">
            <input v-model="weightInput.warmUpSets[warmUpSetCount]" 
            type="number" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
            placeholder="Weight (kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="weightInput.warmUpReps[warmUpSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
            placeholder="Reps"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
        </div>  
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="workingAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-7">Add</button>
        
        <div>
          <div v-for="(workingset, workingSetCount) in workingSets" :key="workingSetCount" class="item flex justify-smart mt-1">
            {{ workingset }}  
          <div class="ml-3">
            <input v-model="weightInput.workingSets[workingSetCount]" 
            type="number" 
            class="mt-1 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
            placeholder="Weight (Kg)"
            onkeypress='return event.charCode >= 48 && event.charCode <= 57'/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="weightInput.workingReps[workingSetCount]" 
            type="number" 
            class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
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
import { ref } from 'vue';
import { useWeightInputStore } from '@/stores/storeWeight';

const selectedExercise = defineProps({
  selectedExercise: String
});

let warmUpSetCount = 0;
let workingSetCount = 0;
const workingSets = ref([]);
const workingReps = ref([]);
const warmUpSets = ref([]);
const warmUpReps = ref([]);
const set = ref([]);
const weightInput = useWeightInputStore();


// const warmUpInput = ref([]);
// warmUpInput.value = {
//     warmUpSets: [],
//     warmUpReps: []
// }

// const workingInput = ref([]);
// workingInput.value = {
//     workingSets: [],
//     workingReps: []
// }

const warmUpAddSet = () => { 
  const newWarmUpSet = {
    id: warmUpSetCount++,
    content: warmUpSetCount.toString().concat('. Set')
  };
  weightInput.warmUpSets.value.push(newWarmUpSet.content);
};

const workingAddSet = () => {   
  const newWorkingSet = {
    id: workingSetCount++,
    content: workingSetCount + ". Set"
  };
  weightInput.workingSets.value.push(newWorkingSet.content);
};

function validateNumber(event, property, index) {
      const inputValue = event.target.value;
      const isValid = !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
      
      if (!isValid) {
        // If the input is not a valid number, reset the property value to null
        weightInput.workingSets.value[index][property] = null;
      }
    };

weightInput.addWeightInput(workingSets, workingReps, warmUpSets, warmUpReps, selectedExercise);

</script>

<style> 

</style>