<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface GameSettings {
  operations: {
    multiplication: boolean
    division: boolean
  }
  ranges: {
    min1: number
    max1: number
    min2: number
    max2: number
  }
  target: number
}

// Parse and validate settings from route
const settings: GameSettings = {
  operations: JSON.parse(route.query.operations as string),
  ranges: JSON.parse(route.query.ranges as string),
  target: parseInt(route.query.target as string)
}

// Validate at least one operation is selected
if (!settings.operations.multiplication && !settings.operations.division) {
  router.push('/')
}

// Game state
const currentQuestion = ref(1)
const totalQuestions = ref(settings.target)
const timeElapsed = ref(0)
const score = ref(0)
const userAnswer = ref('')
const currentProblem = ref('')
const correctAnswer = ref(0)

// Generate random problem
const generateProblem = () => {
  const operationTypes = []
  if (settings.operations.multiplication) operationTypes.push('multiplication')
  if (settings.operations.division) operationTypes.push('division')
  
  const operation = operationTypes[Math.floor(Math.random() * operationTypes.length)]
  const range = settings.ranges
  
  let num1 = Math.floor(Math.random() * (range.max1 - range.min1 + 1)) + range.min1
  let num2 = Math.floor(Math.random() * (range.max2 - range.min2 + 1)) + range.min2
  
  if (operation === 'division') {
    // Ensure division problems result in whole numbers
    num1 = num1 * num2
  }
  
  currentProblem.value = operation === 'multiplication' 
    ? `${num1} × ${num2} = ?` 
    : `${num1} ÷ ${num2} = ?`
    
  correctAnswer.value = operation === 'multiplication' 
    ? num1 * num2 
    : num1 / num2
}

// Timer
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  generateProblem()
  timer = setInterval(() => {
    timeElapsed.value++
  }, 1000)
})

const checkAnswer = () => {
  const answer = parseInt(userAnswer.value)
  if (answer === correctAnswer.value) {
    score.value++
    userAnswer.value = ''
    
    if (currentQuestion.value === totalQuestions.value) {
      endGame()
    } else {
      currentQuestion.value++
      generateProblem()
    }
  }
}

// Auto-check when answer length matches expected answer
watch(userAnswer, (newVal) => {
  if (newVal.length === correctAnswer.value.toString().length) {
    checkAnswer()
  }
})

const endGame = () => {
  clearInterval(timer)
  router.push({
    name: 'Results',
    query: {
      time: timeElapsed.value.toString(),
      score: score.value.toString(),
      total: totalQuestions.value.toString()
    }
  })
}
</script>

<template>
  <div class="game-container">
    <div class="game-header">
      <div>Question {{ currentQuestion }} of {{ totalQuestions }}</div>
      <div>Time: {{ timeElapsed }} seconds</div>
    </div>

    <div class="question-container">
      <div class="question">
        {{ currentProblem }}
      </div>
      <input 
        type="number" 
        placeholder="Your answer" 
        v-model="userAnswer"
        @keyup.enter="checkAnswer"
      >
    </div>
  </div>
</template>

<style scoped>
.game-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.question-container {
  text-align: center;
}

.question {
  font-size: 3rem;
  margin: 20px 0;
}

input {
  font-size: 1.5rem;
  padding: 10px;
  width: 100%;
  text-align: center;
}
</style>
