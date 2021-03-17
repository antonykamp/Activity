import { NotFoundError } from "blitz"
import db from "db"

export default async function getCircleUsers(circleId: number) {
  const circle = await db.circle.findUnique({
    where: { id: circleId },
    include: { includedUsers: true, notifications: true },
  })
  if (!circle) {
    throw new NotFoundError()
  }
  return circle
}
