import db from "db"
import { Ctx } from "blitz"

export default async function getNotificationsOfUser(_ = null, context: Ctx) {
  context.session.$authorize()
  const notifications = await db.circle.findMany({
    where: { includedUsers: { some: { id: context.session.userId } } },
    select: { notifications: true, owner: true },
  })
  return notifications
}
