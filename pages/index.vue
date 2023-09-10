<script setup>
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()
const user = useSupabaseUser()

const posts = ref([])
const isPosts = ref(false)
const isLoading = ref(false)

onBeforeMount(async () => {
	try {
		isLoading.value = true
		await userStore.getAllPosts()
		isLoading.value = false
	} catch (error) {
		console.log(error)
	}
})

watch(() => posts.value, () => {
	posts.value = userStore.posts
	if (userStore.posts && userStore.posts.length >= 1) {
		isPosts.value = true
	} else {
		isPosts.value = false
	}
}, { deep: true })

const effect = () => {
	watchEffect(() => {
		posts.value = userStore.posts
		if (userStore.posts && userStore.posts.length >= 1) {
			isPosts.value = true
		} else {
			isPosts.value = false
		}
	})
}

onMounted(effect)
</script>

<template>
	<MainLayout>
		<div id="Index" class="w-full overflow-auto">
			<div class="mx-auto max-w-[500px] overflow-hidden">
				<div id="Posts" class="px-4 max-w-[600px] mx-auto">
					<div v-if="isPosts" v-for="post in posts" :key="post">
						<IndexPost :post="post" @isDeleted="posts = userStore.getAllPosts()" />
					</div>
					<div v-else>
						<ClientOnly>
							<div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
								<div class="text-white mx-auto flex flex-col items-center justify-center">
									<Icon name="eos-icons:bubble-loading" size="50" color="#fff" />
									<p class="w-full mt-1">Loading...</p>
								</div>
							</div>
							<div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
								<div class="text-white mx-auto flex flex-col items-center justify-center">
									<Icon name="tabler:mood-empty" size="50" color="#fff" />
									<p class="w-full">Make the first post!</p>
								</div>
							</div>
						</ClientOnly>
					</div>
					<div class="mt-60" />
				</div>
			</div>
		</div>
	</MainLayout>
</template>
