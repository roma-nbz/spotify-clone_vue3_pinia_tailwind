<script setup>
import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
import { onMounted, ref, toRefs } from 'vue'
import Heart from 'vue-material-design-icons/Heart.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import Play from 'vue-material-design-icons/Play.vue'

const useSong = useSongStore()
const { isPlaying, audio, currentArtist, currentTrack } = storeToRefs(useSong)

const isHover = ref(false)
const isTrackTime = ref(null)

const props = defineProps({
	artist: {
		type: Object,
		required: true
	},
	track: {
		type: Object,
		required: true
	},
	index: {
		type: Number,
		required: true
	}
})

const { artist, track, index } = toRefs(props)

onMounted(() => {
	const audio = new Audio(track.value.path)
	audio.addEventListener('loadedmetadata', () => {
		const duration = audio.duration
		const minutes = Math.floor(duration / 60)
		const seconds = Math.floor(duration % 60)
		isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
	})
})
</script>

<template>
	<li @mouseenter="isHover = true" @mouseleave="isHover = false"
		class="flex items-center justify-between rounded-md hover:bg-[#2a2929]">
		<div class="flex items-center w-full py-1.5">
			<div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
				<Play @click="useSong.playOrPauseThisSong(artist, track)" v-if="!isPlaying" fillColor="#fff" :size="25" />
				<Play @click="useSong.loadSong(artist, track)" v-else-if="isPlaying && currentTrack.name !== track.name"
					fillColor="#fff" :size="25" />
				<Pause v-else fillColor="#fff" :size="25" />
			</div>
			<div @click="useSong.playOrPauseSong" v-else class="text-white font-semibold w-[40px] ml-5">
				<span :class="{ 'text-green-500': currentTrack && currentTrack.name === track.name }">{{ index }}</span>
			</div>
			<div>
				<p class="text-white font-semibold" :class="{ 'text-green-500': currentTrack && currentTrack.name === track.name }">
					{{ track.name }}
				</p>
				<p class="text-sm font-semibold text-gray-400">{{ artist.name }}</p>
			</div>
		</div>
		<div class="flex items-center">
			<button type="button" v-if="isHover">
				<Heart fillColor="#1bd760" :size="22" />
			</button>
			<div v-if="isTrackTime" class="text-xs mx-5 text-gray-400">
				{{ isTrackTime }}
			</div>
		</div>
	</li>
</template>


