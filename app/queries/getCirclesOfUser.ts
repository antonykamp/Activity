import db from "db"
import { Ctx } from "blitz"

export default async function getCirclesOfUser(_ = null, context: Ctx) {
  context.session.$authorize()
  const circles = await db.circle.findMany({
    where: { ownerId: context.session.userId },
    orderBy: { name: "desc" },
  })
  return circles
}
