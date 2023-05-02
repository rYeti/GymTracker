<template>
    <div class="triceps">
      <h1>Triceps</h1>
      <ExerciseList muscle="Triceps"/>
    </div>
  </template>

<script setup>
import {ExerciseList} from "@/components/Index.js";

</script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  