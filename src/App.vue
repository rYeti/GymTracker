<script setup>
import { NavigationModel } from "./components/Index.js";

</script>

<template>
    <div class="app-container">
        <NavigationModel />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>


<style scoped lang="scss">
 @import '/css/head.scss';
 .app-container
 {
  width: 100%;
 }

  .container
  {
    max-width: 1024px;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    background: black;
  }
</style>
