<script setup>
import uniqolor from 'uniqolor'
import { ref, toRefs } from 'vue'

const randColor = ref('')
randColor.value = uniqolor.random()

const props = defineProps({
	category: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
})

const { category, image } = toRefs(props)
</script>

<template>
	<RouterLink to="/library">
		<div v-if="randColor.color" :style="`background-color: ${randColor.color}`"
			class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden">
			<p class="text-white pt-3 pl-4 font-semibold text-[23px]">{{ category }}</p>
			<img class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]" :src="image || ''" alt="">
		</div>
	</RouterLink>
</template>


