import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/library',
			name: 'library',
			component: () => import('../views/Library.vue'),
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('../views/Search.vue'),
		},
	],
})

export default router
