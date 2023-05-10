<template>
  //TODO make view resposive on button click add
    <div class="w-2/3 mx-auto">
      <div class="warmup-sets mt-12 w-2/3">
        <label>Warm-Up Sets</label>
        <button @click="warmUpAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">Add</button>
        <div v-for="warmupset in warmUpInput.warmUpSets" class="item" :key="warmupset">
          {{ warmupset }}
          <input name="warmupweight" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg" />
        </div>
      </div>

      <div class="working-set mt-5">
        <label>Working Sets</label>
        <button @click="workingAddSet()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-7">Add</button>
        
        <div>
          <div v-for="(workingset, index) in workingInput.workingSets" class="item flex justify-smart mt-3" :key="index">
            {{ workingset }}  
          <div class="ml-3">
            <input v-model="workingInput.workingSets" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg"/>
          </div>
          <label>Reps</label>
          <div class="ml-3">
            <input v-model="workingInput.workingReps" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Reps">
          </div>
        </div>  
      </div>
      
      </div>
      <button @click="addWeight()" class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Save</button>

    </div>
</template>

<script setup>
import { useWeightStore } from '@/stores/storeWeight';

let warmUpSetCount = 0;
let workingSetCount = 0;

const weight = useWeightStore();

let warmUpInput = {
    warmUpSets: [],
    warmUpReps: []
}

let workingInput = {
    workingSets: [],
    workingReps: []
}

const warmUpAddSet = () => { 
  const newWarmUpSet = {
    id: warmUpSetCount++,
    content: warmUpSetCount + ". Set"
  };
  warmUpInput.warmUpSets.push(newWarmUpSet.content);
  console.log(warmUpInput.warmUpSets);
};

const workingAddSet = () => {   
  const newWorkingSet = {
    id: workingSetCount++,
    content: workingSetCount + ". Set"
  };
workingInput.workingSets.push(newWorkingSet.content);
console.log(workingInput);
};

const addWeight = () => {
  //TODO: Add warmup sets and reps to store
  weight.addWeight(workingSetInput.value, workingRepsSets.value);
  workingSetInput.value = "";
  workingRepsSets.value = "";
}

console.log(addWeight);

</script>

<style> 

</style>

export default weightsInput;