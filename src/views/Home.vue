<template>
<div>
    <label>{{ legs }}</label>
</div>
<div class="" type="date"></div>
</template>

<script setup>
import { useExerciseStore } from '@/stores/storeExercise.js';
import { objectEntries } from '@vueuse/core';
import { ref } from 'vue';

const exercises = useExerciseStore();
let date = new Date();
let data = new Object();
let muscle = '';
let exercise = '';
let set = '';

const legs = 'Legs'

const local = localStorage;

Object.keys(local).forEach(function(key) {
    data = JSON.parse(local[key]);
    // console.log(data)
})

Object.keys(data).forEach(function(key) {
    console.log(data[key])
    muscle = data[key]
})

Object.keys(muscle[key2]).forEach(function(key3) {
    exercise = data[key2][key3]
    console.log(exercise)
})

Object.keys(exercise).forEach(function(key4) {
    set = exercise[key4]
    console.log(set)
})

</script>
