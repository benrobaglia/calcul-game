<script setup lang="ts">
import { ref } from 'vue'

const operations = ref({
  multiplication: true,
  division: true
})

const ranges = ref({
  min1: 2,
  max1: 12,
  min2: 2,
  max2: 12
})

const targetOperations = ref(50)

import { useRouter } from 'vue-router'

const router = useRouter()

const validateSettings = () => {
  // Validate at least one operation is selected
  if (!operations.value.multiplication && !operations.value.division) {
    alert('Please select at least one operation type')
    return false
  }

  // Validate number ranges
  if (ranges.value.min1 >= ranges.value.max1 || ranges.value.min2 >= ranges.value.max2) {
    alert('Invalid number ranges: min must be less than max')
    return false
  }

  // Validate target operations
  if (targetOperations.value < 1) {
    alert('Target operations must be at least 1')
    return false
  }

  return true
}

const startGame = () => {
  if (!validateSettings()) return
  
  router.push({
    name: 'Game',
    query: {
      operations: JSON.stringify(operations.value),
      ranges: JSON.stringify(ranges.value),
      target: targetOperations.value.toString()
    }
  })
}
</script>

<template>
  <div class="settings-container">
    <h1>Calcul Game Settings</h1>
    
    <div class="operations-section">
      <h2>Operation Types</h2>
      <label>
        <input type="checkbox" v-model="operations.multiplication"> Multiplication
      </label>
      <label>
        <input type="checkbox" v-model="operations.division"> Division
      </label>
    </div>

    <div class="ranges-section">
      <h2>Number Ranges</h2>
      <div class="range-inputs">
        <label>
          First number min: <input type="number" v-model.number="ranges.min1" min="1">
        </label>
        <label>
          First number max: <input type="number" v-model.number="ranges.max1" min="2">
        </label>
        <label>
          Second number min: <input type="number" v-model.number="ranges.min2" min="1">
        </label>
        <label>
          Second number max: <input type="number" v-model.number="ranges.max2" min="2">
        </label>
      </div>
    </div>

    <div class="target-section">
      <label>
        Target operations: <input type="number" v-model.number="targetOperations" min="1">
      </label>
    </div>

    <button @click="startGame" class="start-button">Start Game</button>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.operations-section, .ranges-section, .target-section {
  margin-bottom: 20px;
}

.range-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.start-button {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
