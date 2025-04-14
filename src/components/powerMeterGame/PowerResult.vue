<script setup lang="ts">
import MeasureIcon from '@/components/icons/MeasureIcon.vue'
import Prize from '@/assets/images/prize.svg'
import PrizeGlow from '@/assets/images/prize_glow.svg'
import { usePowerMeterGameStore } from '@/store/usePowerMeterGameStore.ts'
import { storeToRefs } from 'pinia'

const gameStore = usePowerMeterGameStore()
const { isWin } = storeToRefs(gameStore)
</script>

<template>
  <div class="relative">
    <img
      :src="isWin ? PrizeGlow : Prize"
      :class="isWin ? 'absolute bottom-[225px] left-[19px]' : 'absolute bottom-[257px] left-[49px]'"
      alt="Приз"
    />
    <MeasureIcon />
  </div>
</template>
