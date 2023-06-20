<template>
  <div>
    <canvas ref="exerciseChart" :style="{ height: '400px', width: '600px' }" />
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
  toDate: {
    type: String,
    required: false
  }
})

const dateTo = computed(() => new Date(props.toDate))
const dateFrom = computed(() => new Date(props.fromDate))

//https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
const orderdExerciseDate = Object.keys(exercises.exercises)
  .sort()
  .reduce((obj, key) => {
    obj[key] = exercises.exercises[key]
    return obj
  }, {})

const filteredData = computed(() =>
  Object.entries(orderdExerciseDate)
    .filter(([date]) => {
      const currentDate = new Date(date)
      const today = new Date()
      return currentDate >= dateFrom.value && currentDate <= today
    })
    .map(([, muscleData]) => muscleData[props.muscle]?.[props.exercise])
    .filter(Boolean)
)
const chartData = computed(() =>
  filteredData.value.map((exercise, index) => {
    const date = new Date(Object.keys(orderdExerciseDate)[index])
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
    const maxWorkingSetWeight = Math.max(...exercise.workingSet.map((set) => set.workingSetWeight))
    const maxWorkingSetReps = Math.max(...exercise.workingSet.map((set) => set.workingSetReps))

    return {
      date: formattedDate,
      workingSetWeights: Number.isNaN(maxWorkingSetWeight) ? 0 : maxWorkingSetWeight,
      workingSetReps: Number.isNaN(maxWorkingSetReps) ? 0 : maxWorkingSetReps
    }
  })
)

const labels = computed(() => chartData.value.map((data) => data.date))
const workingSetWeights = computed(() => chartData.value.map((data) => data.workingSetWeights))
const workingSetReps = computed(() => chartData.value.map((data) => data.workingSetReps))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: Math.max(
        Math.max(...workingSetWeights.value),
        Math.max(...workingSetReps.value)
      )
    }
  }
}))

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
      },
      {
        label: 'Reps',
        data: workingSetReps.value,
        fill: false,
        borderColor: 'green'
      }
    ]
  },
  options: chartOptions.value
}))

console.log(labels.value)
const exerciseChart = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = exerciseChart.value.getContext('2d')
  chartInstance = new ChartJS(ctx, chartConfig.value)
})

watch([filteredData, chartOptions], () => {
  if (chartInstance) {
    chartInstance.data.labels = labels.value
    chartInstance.data.datasets[0].data = workingSetWeights.value
    chartInstance.data.datasets[1].data = workingSetReps.value
    chartInstance.options.scales.y.suggestedMax = Math.max(
      Math.max(...workingSetWeights.value),
      Math.max(...workingSetReps.value)
    )

    chartInstance.update()
  }
})
</script>
