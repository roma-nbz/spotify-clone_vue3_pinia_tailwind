<script setup>
import AppPlayer from '@/components/AppPlayer.vue'
import Menu from '@/components/Menu.vue'
import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import { RouterView } from 'vue-router'

const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

const openMenu = ref(false)

onMounted(() => {
  isPlaying.value = false
})
</script>

<template>
  <div>
    <div
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between">
      <div class="flex items-center ml-6">
        <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
          <ChevronLeft fillColor="#fff" :size="30" />
        </button>
        <button type="button" class="rounded-full bg-black p-[1px] ml-4 cursor-pointer">
          <ChevronRight fillColor="#fff" :size="30" />
        </button>
      </div>
      <button @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer">
        <div class="flex items-center">
          <img class="rounded-full" width="27" src="https://picsum.photos/id/202/50">
          <span class="text-white text-[14px] ml-1.5 font-semibold">Roman Orlov</span>
          <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#fff" :size="25" />
          <ChevronUp v-else @click="openMenu = false" fillColor="#fff" :size="25" />
        </div>
      </button>
      <span v-if="openMenu"
        class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3e3d3d] border-b border-b-gray-600">Profile</li>
          <li class="px-3 py-2.5 hover:bg-[#3e3d3d]">Log out</li>
        </ul>
      </span>
    </div>
    <div id="SideNav" class="h-[100%] p-5 w-[240px] fixed z-50 bg-black">
      <RouterLink to="/">
        <img width="125" src="/images/icons/spotify-logo.png">
      </RouterLink>
      <div class="my-8" />
      <ul>
        <RouterLink to="/">
          <Menu class="ml-[1px]" :iconSize="23" name="Home" iconString="home" url="/" />
        </RouterLink>
        <RouterLink to="/search">
          <Menu class="ml-[1px]" :iconSize="23" name="Search" iconString="search" url="/search" />
        </RouterLink>
        <RouterLink to="/library">
          <Menu class="ml-[2px]" :iconSize="23" name="Library" iconString="library" url="/library" />
        </RouterLink>
        <div class="py-3.5" />
        <Menu :iconSize="24" name="Create Playlist" iconString="playlist" url="/playlist" />
        <Menu class="-ml-[1px]" :iconSize="27" name="Liked Songs" iconString="liked" url="/liked" />
      </ul>
      <div class="border-b border-b-gray-700" />
      <ul>
        <li class="fon-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #1</li>
        <li class="fon-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #2</li>
        <li class="fon-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #3</li>
        <li class="fon-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #4</li>
      </ul>
    </div>
  </div>
  <div class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1c1c1c] to-black">
    <div class="mt-[70px]" />
    <RouterView />
    <div class="mb-[100px]" />
  </div>
  <AppPlayer v-if="currentTrack" />
</template>

