import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async e => {
	const body = await readBody(e)

	const res = await prisma.likes.create({
		data: {
			userId: body.userId,
			postId: body.postId,
		},
	})
	return res
})
