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
          <div v-for="workingset in workingSets" class="item flex justify-smart mt-3" :key="workingset">
            {{ workingset }}  
          <div class="ml-3">
            <input type="workingInput" name="workinweight" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Weight in Kg"/>
          </div>
          <label>Reps</label>
          <div class="ml-3">
            <input type="workingInput" name="workinweight" class="mt-1 px-3 py-2 bg-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Reps"/>
          </div>
        </div>  
      </div>
      
      </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

let warmUpSetCount = 0;
let workingSetCunt = 0;

const warmUpInput = ref('');
const workingInput = ref('');
const warmUpSets = ref([]); 
const workingSets = ref([]);

const warmUpAddSet = () => { 
  const newWarmUpSet = {
    id: warmUpSetCount++,
    content: warmUpSetCount + ". Set"
  };
  warmUpSets.value.push(newWarmUpSet.content);
}

const workingAddSet = () => {   const newWorkingSet = {
    id: workingSetCunt++,
    content: workingSetCunt + ". Set"
  };
  workingSets.value.push(newWorkingSet.content);};

</script>

<style> 

</style>

export default weightsInput;