<script setup lang="ts">
import SliderTrackIcon from '@/components/icons/SliderTrackIcon.vue'
import SliderThumbIcon from '@/components/icons/SliderThumbIcon.vue'
import { ref, watch } from 'vue'
import { usePowerMeterGameStore } from '@/store/usePowerMeterGameStore.ts'
import { storeToRefs } from 'pinia'

type Direction = 1 | -1

const TIME_IN_SEC = 5

const gameStore = usePowerMeterGameStore()
const { status } = storeToRefs(gameStore)
const { changePowerHit } = gameStore

const position = ref<number>(0)
const direction = ref<Direction>(1)

const intervalId = ref<ReturnType<typeof setInterval>>()

const startAnimation = () => {
  intervalId.value = setInterval(
    () => {
      if (position.value >= 100) {
        position.value = 100
        direction.value = -1
      }
      if (position.value <= 0) {
        position.value = 0
        direction.value = 1
      }

      position.value += direction.value * 2
    },
    (TIME_IN_SEC * 1000) / 100,
  )
}

const stopAnimation = () => {
  clearInterval(intervalId.value)
}

watch(
  status,
  () => {
    if (status.value === 'ready') {
      position.value = 0
      startAnimation()
    } else if (intervalId.value) {
      changePowerHit(position.value)
      stopAnimation()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="power-slider" :style="{ '--position': position + '%' }">
    <SliderTrackIcon class="power-slider__track" />
    <div class="power-slider__progress">
      <div class="power-slider__progress-fill"></div>
    </div>
    <div class="thumb">
      <div class="thumb__thumb">
        <SliderThumbIcon class="power-slider__thumb" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.power-slider {
  --position: 0;
  width: 48px;
  height: 147px;
  position: relative;
}

.power-slider__progress {
  position: absolute;
  width: 34px;
  height: 141px;
  border-radius: 2px;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
}

.power-slider__progress-fill {
  position: relative;
  width: 100%;
  height: 100%;
}

.power-slider__progress-fill::before {
  content: '';
  position: absolute;
  width: 100%;
  height: var(--position);
  background-color: #00d355;
  bottom: 0;
}

.power-slider::before {
  content: '';
  position: absolute;
  background-image: url('@/assets/images/meter/scale-1.svg');
  background-repeat: no-repeat;
  background-position: center;
  width: 14px;
  height: 138px;
  bottom: 4px;
  left: 8px;
  z-index: 2;
}

.power-slider::after {
  content: '';
  position: absolute;
  background-image: url('@/assets/images/meter/scale-2.svg');
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 133px;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.thumb {
  position: absolute;
  width: 100%;
  height: calc(100% - 4px);
  bottom: 0;
}

.thumb__thumb {
  position: relative;
  height: 100%;
}

.power-slider__thumb {
  position: absolute;
  z-index: 3;
  bottom: var(--position);
}
</style>
