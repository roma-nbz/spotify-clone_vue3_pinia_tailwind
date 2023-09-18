<script setup>
import { ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
	iconString: {
		type: String,
		required: true
	},
	iconSize: {
		type: Number,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
})

const { iconString, iconSize, url, name } = toRefs(props)

const icon = ref(null)
const textIsHover = ref(false)

const isHover = () => {
	if (icon.value === iconString.value + '-active') return

	if (icon.value === iconString.value + '-inactive') {
		icon.value = iconString.value + '-inactive-hover'
		textIsHover.value = true
	} else {
		icon.value = iconString.value + '-inactive'
		textIsHover.value = false
	}
}

watchEffect(() => {
	if (route.path == url.value) {
		icon.value = iconString.value + '-active'
		textIsHover.value = true
	} else {
		icon.value = iconString.value + '-inactive'
		textIsHover.value = false
	}
})
</script>

<template>
	<li @mouseenter="isHover" @mouseleave="isHover" class="flex items-center justify-start pb-4 cursor-pointer">
		<img :width="iconSize" :src="`/images/icons/${icon}.png`">
		<div class="font-semibold text-[14px] ml-4 mt-0.5" :class="textIsHover ? 'text-white' : 'text-gray-400'">
			<span :class="route.path == url ? 'text-white' : ''">
				{{ name }}
			</span>
		</div>
	</li>
</template>


