import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async e => {
	const deleted = await prisma.likes.delete({
		where: { id: Number(e.context.params.id) },
	})
	return deleted
})
