<script setup lang="ts">
interface IAppButtonProps {
  type?: 'button' | 'submit' | 'reset'
  bgColor?: 'yellow' | 'pink'
}

const { type = 'button', bgColor = 'pink' } = defineProps<IAppButtonProps>()

const classes = {
  pink: 'border-white bg-[#FF42E0] text-white',
  yellow: 'border-[#BB20A2] bg-[#FFDF35] text-[#BB20A2]',
}
</script>

<template>
  <button
    :type="type"
    class="cursor-pointer flex items-center justify-center center w-full p-[10px] border rounded-[4px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-[14px] leading-none uppercase font-bold"
    :class="classes[bgColor]"
  >
    <slot />
  </button>
</template>
