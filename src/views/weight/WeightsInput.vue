<template>
  //TODO make view resposive on button click add
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-12 w-2/3">
        <label>Warm-Up Sets</label>
        <button @click="warmUpAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-5">Add</button>
        <div>
          <div v-for="warmUpSet in warmUpSets" :key="warmUpSet" class="item flex justify-smart mt-1">
            {{ warmUpSet }}  
          <div class="ml-3">
            <input v-model="warmUpSets" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg"/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="warmUpReps" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Reps">
          </div>
        </div>  
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="workingAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-7">Add</button>
        
        <div>
          <div v-for="workingset in set" :key="workingset" class="item flex justify-smart mt-1">
            {{ workingset }}  
          <div class="ml-3">
            <input v-model="workingSets" class="mt-1 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg"/>
          </div>
          <label class="ml-3 mt-2">Reps</label>
          <div class="ml-3">
            <input v-model="workingReps" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Reps">
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
  warmUpSets.value.push(newWarmUpSet.content);
};

const workingAddSet = () => {   
  const newWorkingSet = {
    id: workingSetCount++,
    content: workingSetCount + ". Set"
  };
 workingSets.value.push(newWorkingSet.content);
};

weightInput.addWeightInput(workingSets, workingReps, warmUpSets, warmUpReps, selectedExercise);

</script>

<style> 

</style>