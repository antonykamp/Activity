import db from "db"
import { Ctx } from "blitz"

export default async function addNewCircle(newCircleName, context: Ctx) {
  context.session.$authorize()
  const circle = await db.circle.create({
    data: { name: newCircleName, ownerId: context.session.userId },
  })
  return circle
}
