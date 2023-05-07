<template>
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-12 w-2/3">
        <label>Warm-Up Sets</label>
        <button @click="warmUpAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">Add</button>
        <div v-for="warmupset in warmUpSets" class="item" :key="warmupset">
          {{ warmupset }}
          <input type="warmUpInput" name="warmupweight" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg" />
        </div>
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="workingAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-7">Add</button>
        
        <div>
          <div v-for="(workingset, index) in workingSets" class="item flex justify-smart mt-3" :key="index">
            {{ workingset }}  
          <div class="ml-3">
            <input v-model="workingSetInput" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg"/>
          </div>
          <label>Reps</label>
          <div class="ml-3">
            <input v-model="workingInput" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Reps">
          </div>
        </div>  
      </div>
      
      </div>
      <button @click="addWeight()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Save</button>

    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useWeightStore } from '@/stores/storeWeight';

let warmUpSetCount = 0;
let workingSetCount = 0;

const weight = useWeightStore();
const workingSetInput = ref('');
const workingRepsSets = ref('');
const warmUpSets = ref([]); 
const workingSets = ref([]);

const warmUpInput = () => {
  weightInput.value = warmUpInput.value;
  repInput.value = warmUpInput.value;
}
const warmUpAddSet = () => { 
  const newWarmUpSet = {
    id: warmUpSetCount++,
    content: warmUpSetCount + ". Set"
  };
  warmUpSets.value.push(newWarmUpSet.content);
}

const workingAddSet = () => {   const newWorkingSet = {
    id: workingSetCount++,
    content: workingSetCount + ". Set"
  };
  workingSets.value.push(newWorkingSet.content);};

const addWeight = () => {
  weight.addWeight(workingSetInput.value, workingRepsSets.value);
  workingSetInput.value = "";
  workingRepsSets.value = "";
}

console.log(addWeight);

</script>

<style> 

</style>

export default weightsInput;