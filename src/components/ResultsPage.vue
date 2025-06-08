<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const time = route.query.time
const score = route.query.score
const total = route.query.total

const playAgain = () => {
  router.push('/')
}
</script>

<template>
  <div class="results-container">
    <h1>Game Completed!</h1>
    
    <div class="stats">
      <div>Time: {{ time }} seconds</div>
      <div>Score: {{ score }} / {{ total }}</div>
    </div>

    <button @click="playAgain" class="play-again-button">Play Again</button>
  </div>
</template>

<style scoped>
.results-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.stats {
  font-size: 1.5rem;
  margin: 30px 0;
}

.play-again-button {
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
