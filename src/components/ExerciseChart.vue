<template>
  <div class="flex w-1/2">
    <div>
      <canvas v-once ref="exerciseChart" :style="{ height: '400px', width: '400px' }" />
    </div>
    <div>
      <canvas class="ml-5" ref="exerciseRepsChart" :style="{ height: '400px', width: '400px' }" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, defineProps } from 'vue'
import { useWeightInputStore } from '@/stores/storeInput'
import ChartJS from 'chart.js/auto'

const exercises = useWeightInputStore()

const props = defineProps({
  muscle: {
    type: String,
    required: true
  },
  exercise: {
    type: String,
    required: true
  },
  fromDate: {
    type: String,
    required: true
  },
})

const dateFrom = computed(() => new Date(props.fromDate))

// https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
// https://michaeluloth.com/javascript-filter-boolean/
// Sorting the exercises by date
const orderdExerciseDate = Object.keys(exercises.exercises)
  .sort()
  .reduce((obj, key) => {
    obj[key] = exercises.exercises[key]
    return obj
  }, {})

// Filtering the data based on the date range and extracting the relevant exercise information
const filteredData = computed(() =>
  Object.entries(orderdExerciseDate)
    .filter(([date]) => {
      const currentDate = new Date(date)
      const today = new Date()
<<<<<<< HEAD
      return currentDate >= dateFrom.value && currentDate <= today
=======
      // return the earliest date of the exercise and between today's date
      return date && currentDate <= today
>>>>>>> 166b07de4b34fa243953bf05ae15880929c7132f
    })
    // define exercies.workingSet
    .map(([, muscleData]) => muscleData[props.muscle]?.[props.exercise])
    .filter(Boolean)
)

/**
 * chartjs https://www.chartjs.org/
 * Transforming the filtered data into chart-ready format
 */
const chartData = computed(() =>

  filteredData.value.map((exercise, index) => {
    const date = new Date(Object.keys(orderdExerciseDate)[index])
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
<<<<<<< HEAD
    console.log(date)
    const lastWorkingSetWeight = exercise.workingSet[exercise.workingSet.length - 1]?.workingSetWeight
    const lastWorkingSetReps = exercise.workingSet[exercise.workingSet.length - 1]?.workingSetReps

=======
    const maxWorkingSetWeight = exercise.workingSet[exercise.workingSet.length - 1]?.workingSetWeight
    const maxWorkingSetReps = exercise.workingSet[exercise.workingSet.length - 1]?.workingSetReps
>>>>>>> 166b07de4b34fa243953bf05ae15880929c7132f
    return {
      date: formattedDate,
      workingSetWeights: Number.isNaN(lastWorkingSetWeight) ? 0 : lastWorkingSetWeight,
      workingSetReps: Number.isNaN(lastWorkingSetReps) ? 0 : lastWorkingSetReps
    }
  })
)

// Extracting the chart labels, working set weights, and working set reps
const labels = computed(() => chartData.value.map((data) => data.date))
const workingSetWeights = computed(() => chartData.value.map((data) => data.workingSetWeights))
const workingSetReps = computed(() => chartData.value.map((data) => data.workingSetReps))

// Chart options for weight chart
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: Math.max(...workingSetWeights.value)
    }
  }
}))

// Chart options for reps chart
const chartRepsOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: Math.max(...workingSetReps.value)
    }
  }
}))

// Chart configuration for weight chart
const chartConfig = computed(() => ({
  type: 'line',
  data: {
    labels: labels.value,
    datasets: [
      {
        yAxisID: 'y',
        label: 'Weight',
        data: workingSetWeights.value,
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)'
      }
    ]
  },
  options: chartOptions.value
}))

// Chart configuration for reps chart
const chartConfigReps = computed(() => ({
  type: 'line',
  data: {
    labels: labels.value,
    datasets: [
      {
        yAxisID: 'y',
        label: 'Reps',
        data: workingSetReps.value,
        fill: false,
        borderColor: 'rgba(14, 171, 82, 1)'
      }
    ]
  },
  options: chartRepsOptions.value
}))

// References to chart canvases
const exerciseChart = ref(null)
const exerciseRepsChart = ref(null)

// Chart instances
let chartInstance = null
let chartRepsInstance = null

// Chart initialization
onMounted(() => {
  const ctx = exerciseChart.value.getContext('2d')
  const ctxReps = exerciseRepsChart.value.getContext('2d')
  chartInstance = new ChartJS(ctx, chartConfig.value)
  chartRepsInstance = new ChartJS(ctxReps, chartConfigReps.value)
})

// Watch for changes in filteredData and chartOptions to update the charts
watch([filteredData, chartOptions], () => {
  if (chartInstance || chartRepsInstance) {
    chartInstance.data.labels = labels.value
    chartInstance.data.datasets[0].data = workingSetWeights.value
    chartInstance.options.scales.y.suggestedMax = Math.max(Math.max(...workingSetWeights.value))
    chartRepsInstance.data.labels = labels.value
    chartRepsInstance.data.datasets[0].data = workingSetReps.value
    chartRepsInstance.options.scales.y.suggestedMax = Math.max(Math.max(...workingSetReps.value))

    chartInstance.update()
    chartRepsInstance.update()
    console.log(filteredData.value)
  }
})
</script>
