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
    required: true
  }
})

const dateTo = computed(() => new Date(props.toDate))
const dateFrom = computed(() => new Date(props.fromDate))

const exerciseData = exercises.exercises

const filteredData = computed(() =>
  Object.entries(exerciseData)
    .filter(([date]) => {
      const currentDate = new Date(date)
      return currentDate >= dateFrom.value && currentDate <= dateTo.value
    })
    .map(([, muscleData]) => muscleData[props.muscle]?.[props.exercise])
    .filter(Boolean)
)

const chartData = computed(() =>
  filteredData.value.map((exercise, index) => {
    const date = new Date(Object.keys(exerciseData)[index])
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
    const maxWorkingSetWeight = Math.max(...exercise.workingSet.map((set) => set.workingSetWeight))

    return {
      date: formattedDate,
      workingSet: Number.isNaN(maxWorkingSetWeight) ? 0 : maxWorkingSetWeight
    }
  })
)

const labels = computed(() => chartData.value.map((data) => data.date))
const workingSetWeights = computed(() => chartData.value.map((data) => data.workingSet))

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

console.log(workingSetWeights.value)
const chartConfig = computed(() => ({
  type: 'line',
  data: {
    labels: labels.value,
    datasets: [
      {
        label: 'Working Sets',
        data: workingSetWeights.value,
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)'
      }
    ]
  },
  options: chartOptions.value
}))

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
    chartInstance.options.scales.y.suggestedMax = Math.max(...workingSetWeights.value)

    chartInstance.update()
  }
})
</script>
