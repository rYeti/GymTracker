<script setup>
import { NavigationModel } from "./components/Index.js";

</script>

<template>
    <div class="app-container bg-grey h-screen">
        <NavigationModel />
        <div class="container px-3 mx-auto">
            <router-view class="mt-4" />
        </div>
    </div>
</template>


<style scoped lang="scss">
 @import '/css/head.scss';
 .app-container
 {
  width: 100%;
 }

</style>
