import { defineStore } from 'pinia'
import type { StatusGame } from '@/types/StatusGame.ts'
import { computed, ref } from 'vue'

const WIN_CONDITION: number = 100

export const usePowerMeterGameStore = defineStore('powerMeterGameStore', () => {
  const statusRef = ref<StatusGame>('idle')
  const changeStatus = (newStatus: StatusGame) => {
    statusRef.value = newStatus
  }

  const powerHitRef = ref<number>(0)
  const changePowerHit = (newPower: number) => {
    powerHitRef.value = newPower
  }

  const determineResult = () => {
    if (WIN_CONDITION <= powerHitRef.value) return (statusRef.value = 'win')
    return (statusRef.value = 'lose')
  }

  const isFinish = computed(() => status.value === 'win' || status.value === 'lose')
  const isWin = computed(() => status.value === 'win')
  const powerHit = computed(() => powerHitRef.value)
  const status = computed(() => statusRef.value)

  return {
    changeStatus,
    changePowerHit,
    isFinish,
    isWin,
    powerHit,
    status,
    determineResult,
  }
})
