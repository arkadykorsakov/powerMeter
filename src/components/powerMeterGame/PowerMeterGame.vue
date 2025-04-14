<script setup lang="ts">
import RobotReaction from '@/components/powerMeterGame/RobotReaction.vue'
import PowerSlider from '@/components/powerMeterGame/PowerSlider.vue'
import PowerButton from '@/components/powerMeterGame/PowerButton.vue'
import PowerResult from '@/components/powerMeterGame/PowerResult.vue'
</script>

<template>
  <main class="min-h-dvh w-full flex items-center justify-center">
    <div class="w-[360px] h-[640px] bg-image flex flex-col justify-end items-center">
      <PowerResult class="m-[-14px]" />
      <div class="p-[0_13px_0_23px] flex items-end w-full mb-16">
        <PowerSlider />
        <div class="mr-[11px] ml-[23px] flex-auto">
          <PowerButton />
        </div>
        <RobotReaction reaction="bored" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.bg-image {
  background-image: url('@/assets/images/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 76px;
  background-color: #0b0f71;
}
</style>
