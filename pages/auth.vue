<script setup>
import { useUserStore } from '~/stores/user.js'

const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

const login = async (prov) => {
	const { data, error } = await client.auth.signInWithOAuth({
		provider: prov,
		redirectTo: window.location.origin
	})

	if (error) console.log(error)
}

watchEffect(() => {
	if (user.value) {
		return navigateTo('/')
	}
})
</script>

<template>
	<div id="Auth" class="w-full h-screen pt-32">
		<div class="w-full">
			<div class="w-full flex items-center justify-center gap-2.5 p-2">
				<img class="w-[35px]" src="/img/threads-logo.png">
				<span class="font-bold text-2xl text-white">Threads</span>
			</div>
			<div class="max-w-[350px] mx-auto px-2 text-white">
				<p class="text-center mb-6 mt-4">Login / Register</p>
				<button @click="login('github')"
					class="flex items-center justify-center gap-3 p-1.5 w-full border rounded-full text-lg font-semibold">
					<p class="flex items-center gap-2 justify-center">
						<img class="w-full max-w-[30px] rounded-full" src="/img/github-logo.png">
						Github
					</p>
				</button>
			</div>
		</div>
	</div>
</template>
