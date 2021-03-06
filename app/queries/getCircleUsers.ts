import { NotFoundError } from "blitz"
import db from "db"
import { Ctx } from "blitz"

export default async function getCircleUsers(circleId: number, context: Ctx) {
  context.session.$authorize()
  const circle = await db.circle.findFirst({
    where: { id: circleId, owner: { id: context.session.userId } },
    include: { includedUsers: true, notifications: true },
  })
  if (!circle) {
    throw new NotFoundError()
  }
  return circle
}
