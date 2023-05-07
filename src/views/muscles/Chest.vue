<template>
  <div class="flex">
    <div class="w-1/2">
      <h1>Chest</h1>
       <ExerciseList muscle="Chest"/>
    </div>
    <WeightsInput/>
  </div>
</template>

<script setup>
import {ExerciseList} from "@/components/Index.js";
import WeightsInput from "@/views/weight/WeightsInput.vue";

const exerciseListButton = ExerciseList
ExerciseList.exerciseClick
</script>

<style>

</style>