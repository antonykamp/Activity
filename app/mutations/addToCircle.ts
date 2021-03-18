import { NotFoundError } from "blitz"
import db from "db"
import { Ctx } from "blitz"

export default async function addToCircle(
  { newContactId, circleId }: { newContactId: number; circleId: number },
  context: Ctx
) {
  context.session.$authorize()

  const circle = await db.circle.findFirst({
    where: { id: circleId, owner: { id: context.session.userId } },
  })

  if (!circle) {
    throw new NotFoundError()
  }

  await db.circle.update({
    where: { id: circleId },
    data: { includedUsers: { connect: { id: newContactId } } },
  })
}
