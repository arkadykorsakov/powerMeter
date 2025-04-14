<script setup lang="ts">
import { computed } from 'vue'
import bored from '@/assets/images/robot/bored.png'
import mockery from '@/assets/images/robot/mockery.png'
import euphoria from '@/assets/images/robot/euphoria.png'
import { usePowerMeterGameStore } from '@/store/usePowerMeterGameStore.ts'
import { storeToRefs } from 'pinia'

const gameStore = usePowerMeterGameStore()
const { isWin, isFinish } = storeToRefs(gameStore)

const reaction = computed<'bored' | 'mockery' | 'euphoria'>(() => {
  if (!isFinish.value) return 'bored'
  return isWin.value ? 'euphoria' : 'mockery'
})

const images = {
  bored,
  mockery,
  euphoria,
}
</script>

<template>
  <img :src="images[reaction]" alt="Эмоция робота" class="w-[70px] h-auto" />
</template>
