import { defineStore } from 'pinia'
import { ref } from 'vue'
import artist from '../artist.json'

export const useSongStore = defineStore(
	'song',
	() => {
		const isPlaying = ref(false)
		const audio = ref(null)
		const currentArtist = ref(null)
		const currentTrack = ref(null)

		const loadSong = (artist, track) => {
			currentArtist.value = artist
			currentTrack.value = track

			if (audio.value && audio.value.src) {
				audio.value.pause()
				isPlaying.value = false
				audio.value.src = ''
			}

			audio.value = new Audio()
			audio.value.src = track.path

			setTimeout(() => {
				isPlaying.value = true
				audio.value.play()
			}, 200)
		}

		const playOrPauseSong = () => {
			if (audio.value.paused) {
				isPlaying.value = true
				audio.value.play()
			} else {
				isPlaying.value = false
				audio.value.pause()
			}
		}

		const playOrPauseThisSong = (artist, track) => {
			if (
				!audio.value ||
				audio.value.src ||
				currentTrack.value.id !== track.id
			) {
				loadSong(artist, track)
				return
			}
			playOrPauseSong()
		}

		const prevSong = currentTrack => {
			const track = artist.track[currentTrack.id - 2]
			loadSong(artist, track)
		}

		const nextSong = currentTrack => {
			if (currentTrack.id === artist.track.length) {
				const track = artist.tracks[0]
				loadSong(artist, track)
			} else {
				const track = artist.tracks[currentTrack.id]
				loadSong(artist, track)
			}
		}

		const reset = () => {
			isPlaying.value = false
			audio.value = null
			currentArtist.value = null
			currentTrack.value = null
		}

		const playFromFirst = () => {
			reset()
			const track = artist.tracks[0]
			loadSong(artist, track)
		}

		return {
			isPlaying,
			audio,
			currentArtist,
			currentTrack,
			loadSong,
			playOrPauseSong,
			playOrPauseThisSong,
			prevSong,
			nextSong,
			playFromFirst,
			reset,
		}
	},
	{ persist: true }
)
