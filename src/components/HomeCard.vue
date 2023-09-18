<script setup>
import { toRefs } from 'vue'

const props = defineProps({
	image: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	subTitle: {
		type: String,
		required: true
	},
})

const { image, title, subTitle } = toRefs(props)
</script>

<template>
	<RouterLink to="/library">
		<div class="bg-[#111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer">
			<img class="rounded-md" :src="image" alt="">
			<p class="text-white pt-4 font-semibold text-[17px]">{{ title }}</p>
			<p class="text-gray-400 pt-1 pb-3 text-[14px]">{{ subTitle }}</p>
		</div>
	</RouterLink>
</template>



