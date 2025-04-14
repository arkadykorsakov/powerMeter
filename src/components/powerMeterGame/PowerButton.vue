<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { ref } from 'vue'
import defaultBtn from '@/assets/images/powerButton/button.png'
import activeBtn from '@/assets/images/powerButton/button_active.png'
import { storeToRefs } from 'pinia'
import { usePowerMeterGameStore } from '@/store/usePowerMeterGameStore.ts'
import type { StatusGame } from '@/types/StatusGame.ts'

const gameStore = usePowerMeterGameStore()
const { status, isFinish } = storeToRefs(gameStore)
const { changeStatus, determineResult } = gameStore

const messages: Partial<Record<StatusGame, string>> = {
  idle: 'Привет! <br/> Проверим твою силу!',
  win: 'ВОТ ЭТО СИЛА! <br/> Ты выбил главный приз! <br/> <span class="text-[#FF4646]">Рубин</span>',
  lose: 'Неплохо! <br/> Попробуй ещё раз.',
}

const position: Partial<Record<StatusGame, string>> = {
  idle: 'bottom-[0] right-[-98px] rotate-[-43.16deg] origin-bottom',
  ready: 'bottom-[18px] right-[-75px] origin-bottom',
  charging: 'bottom-[40px] right-[-75px] rotate-[-39.42deg] origin-bottom',
  hit: 'hit',
}

const isPressedButton = ref(false)

const startGame = () => {
  isPressedButton.value = false
  changeStatus('ready')
}

const hit = () => {
  changeStatus('charging')
  setTimeout(() => {
    changeStatus('hit')
  }, 1000)
  setTimeout(() => {
    isPressedButton.value = true
  }, 2600)
  setTimeout(() => {
    determineResult()
  }, 3000)
}
</script>

<template>
  <div class="h-[156px] flex flex-col justify-between relative">
    <div class="relative w-[124px] h-[68px] ml-6">
      <img class="object-contain" :src="isPressedButton ? activeBtn : defaultBtn" alt="Кнопка" />
      <img
        src="@/assets/images/powerButton/hammer.png"
        :class="[
          'w-[110px] h-auto absolute',
          isFinish ? 'bottom-[67px] right-[-70px] -rotate-90 origin-bottom' : position[status],
        ]"
        alt="Молот"
      />
    </div>
    <div
      class="absolute bottom-[50px] text-center text-white font-bold w-full whitespace-nowrap leading-none flex flex-col gap-1"
      v-if="messages[status]"
      v-html="messages[status]"
    ></div>
    <AppButton bg-color="yellow" v-if="status === 'ready'" @click="hit">Удар</AppButton>
    <AppButton bg-color="pink" v-else-if="status === 'idle' || isFinish" @click="startGame">
      Новая игра
    </AppButton>
  </div>
</template>

<style scoped>
.hit {
  animation: hitAnimation 3s ease-out forwards;
}

@keyframes hitAnimation {
  0% {
    bottom: 40px;
    right: -75px;
    transform: rotate(-39.42deg);
    transform-origin: bottom;
  }
  100% {
    bottom: 67px;
    right: -70px;
    transform: rotate(-90deg);
    transform-origin: bottom;
  }
}
</style>
