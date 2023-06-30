<template>
  <nav v-show="true" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo" />
    </div>
    <div class="navbar-nav">
      <router-link to="/" class="nav-item nav-link">Dashboard</router-link>
      <router-link to="/Muscles/Legs" class="nav-item nav-link">Legs</router-link>
      <router-link to="/Muscles/Back" class="nav-item nav-link">Back</router-link>
      <router-link to="/Muscles/Chest" class="nav-item nav-link">Chest</router-link>
      <router-link to="/Muscles/Shoulder" class="nav-item nav-link">Shoulder</router-link>
      <router-link to="/Muscles/Triceps" class="nav-item nav-link">Triceps</router-link>
      <router-link to="/Muscles/Biceps" class="nav-item nav-link">Biceps</router-link>
      <button class="nav-item nav-link" @click="importData()">Import</button>
      <button class="nav-item nav-link" @click="exportData()">Export</button>
    </div>
  </nav>
</template>

<script setup>
import { useWeightInputStore } from '@/stores/storeInput'

const exercises = useWeightInputStore()

//https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
/**
 * Export data as a JSON file.
 */
function exportData() {
  const data = JSON.stringify(exercises.exercises)
  const blob = new Blob([data], { type: 'text/plain' })
  const e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
  a.download = 'exercieses.json'
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}

/**
 * Import data from a JSON file.
 */
function importData() {
  //https://forsmile.jp/en/vue-en/1032/
  //https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  //https://developer.mozilla.org/en-US/docs/Web/API/Event/target
  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (readerEvent) => {
      const content = readerEvent.target.result
      exercises.exercises = JSON.parse(content)
    }
  }
  input.click()
}
</script>

<style lang="scss" scoped>
@import '/css/main.scss';
</style>
