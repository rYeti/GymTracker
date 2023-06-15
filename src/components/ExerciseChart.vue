<template>
  <div>
    <canvas ref="exerciseChart" :style="{ height: '400px', width: '600px' }" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useWeightInputStore } from '@/stores/storeInput';
import ChartJS from 'chart.js/auto';

const exercises = useWeightInputStore();

const props = defineProps({
    muscle: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
});

const dateTo = computed(() => new Date(props.toDate));
const dateFrom = computed(() => new Date(props.fromDate));

const exerciseData = exercises.exercises;

const filteredData = computed(() => {

  const filtered = Object.entries(exerciseData)
    .filter(([date]) => {
      const currentDate = new Date(date);
      return currentDate >= dateFrom.value && currentDate <= dateTo.value;
    })
    .map(([, muscleData]) => {
      return muscleData[props.muscle]?.[props.exercise];    })
    .filter(Boolean);
  return filtered;
});

    // Prepare the chart data
const chartData = computed(() =>
  filteredData.value.map((exercise, index) => {
    const date = new Date(Object.keys(exerciseData)[index])
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
    const maxWorkingSetWeight = Math.max(
      ...exercise.workingSet.map(set => set.workingSetWeight),
    )
    return {
      date: formattedDate,
      workingSet: Number.isNaN(maxWorkingSetWeight) ? 0 : maxWorkingSetWeight,
    }
  }),
);

const labels = computed(() => chartData.value.map(data => data.date))
const workingSetWeights = computed(() => chartData.value.map(data => {
  return data.workingSet}
  ))

console.log('working' + workingSetWeights.value)

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: Math.max(Math.max(...workingSetWeights.value),
      ),
    },
  },
}));

const chartConfig = computed(() => ({
  type: 'line',
  data: {
    labels: labels.value,
    datasets: [
      {
        yAxisID: 'y',
        label: 'Working Sets',
        data: workingSetWeights.value,
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
      },
    ],
  },
  options: chartOptions.value,
}));

const exerciseChart = ref(null)
let chartInstance = null

onMounted(() => {
  const ctx = exerciseChart.value.getContext('2d');
  chartInstance = new ChartJS(ctx, chartConfig);
});

watch([filteredData, chartOptions], () => {
  if (chartInstance) {
    console.log('chart' + chartInstance.options)

    chartInstance.data.labels = labels.value
    chartInstance.data.datasets[0].data = workingSetWeights.value
    chartInstance.value.scales.y.suggestedMax = Math.max(
      Math.max(...workingSetWeights.value),
    )
    chartInstance.update()
  }
})
</script>