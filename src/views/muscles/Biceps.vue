<template>
    <div class="biceps">
      <h1>Biceps</h1>
      <ExerciseList muscle="Biceps"/>
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
  